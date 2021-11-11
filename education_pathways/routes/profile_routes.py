from . import app, db
from flask import jsonify, request
from ..models.profiles import Course_Profile_A, Profile
from ..models.users import User
from ..models.courses import Course

# simple profile.create endpoint using cascades
@app.route('/addProfile', methods=['POST'])
def addProfile():
  print('------------begin----------', flush=True)
  data = request.json

  # get the profile
  profile = db.session.query(Profile).join(Profile, User.profiles).\
    filter(User.username==data['username']).\
    filter(Profile.name==data['name']).one()

  # get the courses
  course_ids = []
  course_sessions = []

  for course in data['courses']:
    course_ids.append(course['id'])
    course_sessions.append(course['session'])

  courses_query = Course.query.filter(Course.id.in_(course_ids)).all()
  courses = [(course,course_sessions[index]) \
    for index, course in enumerate(courses_query)]

  # newProfile = Profile(name=data['name'], creator=user)
  profile.add_courses(courses)
  print(profile, flush=True)
  try:
    db.session.commit()
  except Exception as e:
    print(e, flush=True)
    return jsonify(success=False), 400
  db.session.add(profile)
  print('-------------end-----------', flush=True)
  return jsonify(success=True), 200

@app.route('/getProfile', methods=['GET'])
def getProfile():
  print('------------begin----------', flush=True)
  data = request.json
  # user = User.query.filter_by(username=data['username']).one()
  # profile = user.profiles[0]
  profile = db.session.query(Profile).join(Profile, User.profiles).\
    filter(User.username==data['username']).\
    filter(Profile.name==data['name']).one()
  print(profile.courses, flush=True)
  print('-------------end-----------', flush=True)
  return jsonify(success=True), 200