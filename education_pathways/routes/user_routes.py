from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.profiles import Profile

# EXAMPLE: import the model used to create new rows in a table
@app.route('/addUser', methods=['POST'])
def addUser():
  data = request.json
  newUser = User(username=data['username'])
  db.session.add(newUser)
  print('adding user')
  try:
    db.session.commit()
  except:
    return jsonify(success=False), 400
  return jsonify(success=True), 200
