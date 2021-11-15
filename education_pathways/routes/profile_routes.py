from . import app, db
from flask import jsonify, request
from ..models.profiles import Profile
from ..models.users import User
from ..models.courses import Course
from ..models.profiles_schema import profile_schema, profiles_schema

@app.route('/getProfile', methods=['GET'])
def getProfile():
  print('------------begin----------', flush=True)
  data = request.json
  profile = db.session.query(Profile).join(Profile, User.profiles).\
    filter(User.username==data['username']).\
    filter(Profile.name==data['name']).one()
  print(profile.courses, flush=True)
  print('-------------end-----------', flush=True)
  return profile_schema.dump(profile), 200

@app.route('/createProfile', methods=['POST'])
def createProfile():
  print('------------begin----------', flush=True)
  data = request.json

  # profile = db.session.query(Profile).join(Profile, User.profiles).\
  #   filter(User.username==data['username']).\
  #   filter(Profile.name==data['name']).one()
  
  user = User.query.filter_by(username=data['creator_username']).one()
  new_profile = Profile(name=data['name'], creator=user)

  db.session.add(new_profile)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  print('-------------end-----------', flush=True)
  return jsonify(success=True), 200

@app.route('/deleteProfile', methods=['POST'])
def deleteProfile():
  data = request.json
  
  user = User.query.filter_by(username=data['creator_username']).first()
  Profile.query.filter_by(name=data['name'], creator=user).delete()

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200

# simple profile.create endpoint using cascades
@app.route('/updateProfile', methods=['PUT'])
def updateProfile():
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
  profile.add_courses(courses)

  db.session.add(profile)
  print(profile, flush=True)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400
  print('-------------end-----------', flush=True)
  return jsonify(success=True), 200
