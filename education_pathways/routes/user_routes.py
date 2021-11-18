from functools import partial
from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.courses import Course
from ..models.profiles import Profile, Course_Profile_A
from ..models.users_schema import user_schema
from marshmallow.exceptions import ValidationError
from ..models.profiles_schema import years_schema
from sqlalchemy import desc

def mostViewed(profile: Profile, n=3):
  courses = Course_Profile_A.query.filter_by(profile_id=profile.id).all()
  course_ids = [course.course_id for course in courses]
  courses = Course.query.filter(Course.id.in_(course_ids)).order_by(desc(Course.views)).all()

  most_viewed = []
  for course in courses:
    if n <= 0:
      break
    most_viewed.append({"id": course.id, "name": course.code, "views": course.views})
    n -= 1

  return most_viewed

# EXAMPLE: import the model used to create new rows in a table
@app.route('/createUser', methods=['POST'])
def createUser():
  json_data = request.get_json()
  if not json_data:
    return {"message": "No input data provided"}, 400
  try:
    data = user_schema.load(json_data, partial=('id', 'profiles'))
  except ValidationError as err:
    return err.messages, 422
  
  user = User.query.filter_by(username=data['username']).all()
  
  if user:
    return {"message": "User already exists"}, 422
  
  new_user = User(username=data['username'], password=data['password'], default_profile=None)
  new_user.profiles.append(Profile(name='wishlist'))
  new_user.default_profile = 'wishlist'
  
  db.session.add(new_user)
  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400
  return jsonify(success=True), 200

@app.route('/validateLogin', methods=['POST'])
def validateLogin():
  json_data = request.get_json()
  if not json_data:
    return {"message": "No input data provided"}, 400

  try:
    data = user_schema.load(json_data, partial=('id', 'profiles'))
  except ValidationError as err:
    return err.messages, 422

  user = User.query.filter_by(username=data['username'],password=data['password']).one()
  if user:
    profiles = Profile.query.filter_by(creator_id=user.id).all()

    profiles_summary = []
    for profile in profiles:
      profile_preview = {}
      
      profile_preview["name"] = profile.name
      profile_preview["courses"] = mostViewed(profile)
      profile_preview["numCourses"] = Course_Profile_A.query.filter_by(profile_id=profile.id).count()
      profile_preview["numSemesters"] = Course_Profile_A.query.filter_by(profile_id=profile.id).distinct(Course_Profile_A.session, Course_Profile_A.year).count()
      profile_preview["isDefault"] = user.default_profile == profile.name
      profile_preview["schedule"] = profile.profile_sessions()

      profiles_summary.append(profile_preview)

    response = dict(username=data['username'], \
      password=data['password'], profiles=profiles_summary)
    return jsonify(response), 200
  else:
    return {"message":"Invalid login details"}, 500

@app.route('/deleteUser', methods=['DELETE'])
def deleteUser():
  json_data = request.get_json()
  if not json_data:
    return {"message": "No input data provided"}, 400
  try:
    data = user_schema.load(json_data, partial=('id', 'profiles'))
  except ValidationError as err:
    return err.messages, 422
  
  user = User.query.filter_by(username=data['username']).first()
  
  if not user:
    return {"message": "User does not exist in database"}, 422

  # Remove user, and user's profiles
  User.query.filter_by(id=user.id).delete()

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400
  return jsonify(success=True), 200

@app.route('/setDefault', methods=['POST'])
def setDefault():
  data = request.json

  user = User.query.filter_by(username=data["username"]).one()
  profile = Profile.query.filter_by(name=data["profile_name"]).one()

  user.default_profile = profile.name

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200

@app.route('/publishProfile', methods=['POST'])
def publishProfile():
  data = request.json

  profile = Profile.query.filter_by(id=data["profile_id"]).one()
  profile.public = 1

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200

@app.route('/hideProfile', methods=['POST'])
def hideProfile():
  data = request.json

  profile = Profile.query.filter_by(id=data["profile_id"]).one()
  profile.public = 0

  try:
    db.session.commit()
  except Exception as err:
    return {"message": str(err)}, 400

  return jsonify(success=True), 200