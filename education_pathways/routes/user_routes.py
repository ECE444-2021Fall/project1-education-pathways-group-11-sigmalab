from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.profiles import Profile

# EXAMPLE: import the model used to create new rows in a table
@app.route('/addUser', methods=['POST'])
def addUser():
  data = request.json
  new_user = User(username=data['username'])
  new_user.profiles.append(Profile(name='wishlist'))

  db.session.add(new_user)
  try:
    db.session.commit()
  except:
    return jsonify(success=False), 400
  return jsonify(success=True), 200