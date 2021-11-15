from functools import partial
from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.profiles import Profile
from ..models.users_schema import user_schema
from marshmallow.exceptions import ValidationError

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
  
  new_user = User(username=data['username'], password=data['password'])
  new_user.profiles.append(Profile(name='wishlist'))
  
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

  user = User.query.filter_by(username=data['username'],password=data['password']).all()
  if user:
    return jsonify(success=True), 201
  else:
    return {"message":"Invalid login details"}, 500
