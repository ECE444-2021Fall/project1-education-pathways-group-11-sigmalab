from flask.wrappers import Request
from . import app, db
from flask import jsonify, request
from ..models.courses import User

# EXAMPLE: import the model used to create new rows in a table
@app.route('/addUser', methods=['POST'])
def addUser():
  data = request.json
  newUser = User(username=data['username'])
  db.session.add(newUser)
  try:
    db.session.commit()
  except:
    return jsonify(success=False), 400
  return jsonify(success=True), 200