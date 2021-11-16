from . import app, db
from flask import jsonify, request
from ..models.profiles import Profile, Course_Profile_A
from ..models.users import User
from ..models.courses import Course
from ..models.profiles_schema import years_schema, profile_schema, profiles_schema

@app.route('/getProfile', methods=['GET'])
def getProfile():
  data = request.json
  profile = db.session.query(Profile).join(Profile, User.profiles).\
    filter(User.username==data['username']).\
    filter(Profile.name==data['name']).one()
  schedule = profile.profile_sessions
  response = years_schema.dump(schedule)
  return jsonify(response), 200

@app.route('/createProfile', methods=['POST'])
def createProfile():
  data = request.json
  
  user = User.query.filter_by(username=data['creator_username']).one()
  if next((True for prof in user.profiles if prof.name == data['name']), False):
    return {"message": "Profile already exists"}, 422
  for profile in user.profiles:
    print(profile, flush=True)
  new_profile = Profile(name=data['name'], creator=user)

  db.session.add(new_profile)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

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
  data = request.json

  # get the profile
  profile = db.session.query(Profile).join(Profile, User.profiles).\
    filter(User.username==data['username']).\
    filter(Profile.name==data['name']).one()

  Course_Profile_A.query.filter_by(profile_id=profile.id).delete()

  # get the courses
  course_ids = []
  course_sessions = []
  course_years = []

  for course in data['courses']:
    course_ids.append(course['id'])
    course_sessions.append(course['session'])
    course_years.append(course['year'])

  courses_query = Course.query.filter(Course.id.in_(course_ids)).all()
  courses = [(course,course_sessions[index],course_years[index]) \
    for index, course in enumerate(courses_query)]
  profile.add_courses(courses)

  db.session.add(profile)
  print(profile, flush=True)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400
  return jsonify(success=True), 200
