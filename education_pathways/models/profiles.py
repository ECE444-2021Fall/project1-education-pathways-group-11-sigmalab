from sqlalchemy.orm import backref
from .. import db

# association table between courses and profiles
Course_Profile_A = db.Table('course_profile_a',
  db.Column('profile_id', db.Integer, db.ForeignKey('profile.id'),\
    primary_key=True),
  db.Column('course_id', db.Integer, db.ForeignKey('course.id'),\
    primary_key=True)
)

class Profile(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  courses = db.relationship('Course', secondary=Course_Profile_A,\
    lazy='subquery', backref=db.backref('profiles', lazy=True))
  
# class Course_Profile_A(db.Model):
#   __tablename__ = 'course_profile_a'
#   id = db.Column(db.Integer, primary_key=True)
#   profile_id = db.Column(db.Integer, db.ForeignKey('profile'))
#   course_id = db.Column(db.Integer, db.ForeignKey('course'))

