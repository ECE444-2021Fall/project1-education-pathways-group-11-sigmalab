from sqlalchemy.orm import backref
from .. import db

# association table between courses and profiles
Course_Profile_A = db.Table('course_profile_a',
  db.Column('profile_id', db.Integer, \
    db.ForeignKey('profile.id', onupdate="CASCADE", ondelete="CASCADE"), \
    primary_key=True),
  db.Column('course_id', db.Integer, \
    db.ForeignKey('course.id', onupdate="CASCADE", ondelete="CASCADE"),\
    primary_key=True)
)

class Profile(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  creator_id = db.Column(db.Integer, \
    db.ForeignKey('user.id', onupdate="CASCADE", ondelete="CASCADE"))
  creator = db.relationship('User', back_populates='profiles', uselist=False)

  courses = db.relationship('Course', secondary=Course_Profile_A,\
    lazy='subquery')
  