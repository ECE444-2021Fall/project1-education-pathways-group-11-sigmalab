from . import app, db
from flask import jsonify, request
from ..models.profiles import Profile
from ..models.users import User
from ..models.courses import Course

# simple profile.create endpoint using cascades
@app.route('/addProfile', methods=['POST'])
def addProfile():
  user = User.query.limit(1).one()
  course = Course.query.filter_by(id = 120).one()

  newProfile = Profile(creator=user, courses=[course])
  db.session.add(newProfile)
  try:
    db.session.commit()
  except Exception as e:
    print(e, flush=True)
    return jsonify(success=False), 400
  return jsonify(success=True), 200