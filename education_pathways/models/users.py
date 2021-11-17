# from .profiles import ProfileSchema
from .. import db

class User(db.Model):
  __searchable__ = ['username']
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(80), unique=False, nullable=False)
  default_profile = db.Column(db.String(80), unique=False, nullable=True)
  profiles = db.relationship('Profile', back_populates='creator', \
    cascade='all, delete')
