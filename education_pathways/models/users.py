from .. import db

class User(db.Model):
  __searchable__ = ['username']
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  profiles = db.relationship('Profile', back_populates='creator', \
    cascade='all, delete')
