from . import app, db
from flask import jsonify, request
from ..models.profiles import Profile, Course_Profile_A
from ..models.users import User
from ..models.courses import Course
from ..models.profiles_schema import years_schema, profile_schema, profiles_schema
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins":"*"}})


@app.route('/api/getProfile', methods=['GET'])
def getProfile():
  """GET request handler to get the profile of a user based on username and profile name."""
  data = request.args
  try:
    profile = db.session.query(Profile).join(Profile, User.profiles).\
      filter(User.username==data['username']).\
      filter(Profile.name==data['name']).one()
  except Exception as err:
    return {"message": str(err)}, 400
  schedule = profile.profile_sessions()
  num_courses = len([asc.course for asc in profile.course_associations if asc.session != 'unassigned'])
  num_semesters = len(set([str(asc.session)+str(asc.year) for asc in profile.course_associations if asc.session != 'unassigned']))
  res = dict(schedule=schedule, num_courses=num_courses, num_semesters=num_semesters,\
    creator_username=profile.creator.username, name=profile.name)
  response = profile_schema.dump(res)
  return jsonify(response), 200

@app.route('/api/createProfile', methods=['POST'])
def createProfile():
  """POST request handler to create a new profile for a user based on their username and specified profile name."""
  data = request.json
  
  user = User.query.filter_by(username=data['username']).one()
  if next((True for prof in user.profiles if prof.name == data['name']), False):
    return {"message": "Profile already exists"}, 422

  new_profile = Profile(name=data['name'], creator=user)
  db.session.add(new_profile)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200

@app.route('/api/deleteProfile', methods=['DELETE'])
def deleteProfile():
  """DELETE request handler to delete a profile for a user based on the specified profile name."""
  data = request.json
  try:
    user = User.query.filter_by(username=data['username']).first()
    Profile.query.filter_by(name=data['name'], creator=user).delete()
  except Exception as err:
    return {"message": str(err)}, 400

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200

# simple profile.create endpoint using cascades
@app.route('/api/updateProfile', methods=['PUT'])
def updateProfile():
  """"PUT request handler to update the profile of a user based on the specified profile name."""
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
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400
  return jsonify(success=True), 200
