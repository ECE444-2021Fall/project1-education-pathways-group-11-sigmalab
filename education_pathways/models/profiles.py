from .. import db
from .courses import Course

# association table between courses and profiles
# Course_Profile_A = db.Table('course_profile_a',
class Course_Profile_A(db.Model):
  __tablename__ = 'course_profile_a'
  profile_id = db.Column(db.Integer, \
    db.ForeignKey('profile.id', onupdate="CASCADE", ondelete="CASCADE"), \
    primary_key=True)

  course_id = db.Column(db.Integer, \
    db.ForeignKey('course.id', onupdate="CASCADE", ondelete="CASCADE"),\
    primary_key=True)

  course = db.relationship('Course', uselist=False)
  profile = db.relationship('Profile', backref='course_associations')
  # profile = db.relationship('Profile', back_populates='courses')
  
  session = db.Column(db.String(12))
  


class Profile(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), unique=True)

  creator_id = db.Column(db.Integer, \
    db.ForeignKey('user.id', onupdate="CASCADE", ondelete="CASCADE"))
  creator = db.relationship('User', back_populates='profiles', uselist=False)

  courses = db.relationship('Course', secondary='course_profile_a',\
    lazy='subquery', viewonly=True)
  
  def add_courses(self, course_list: list[tuple[Course, str]])->None:
    for course, session in course_list:
      course_association = Course_Profile_A(session=session, course=course)
      self.course_associations.append(course_association)

  def add_course(self, course: Course, session: str)-> None:
    course_association = Course_Profile_A(session=session, course=course)
    self.course_associations.append(course_association)
  
  def __repr__(self):
    return '<Profile {}: {}>'.format(self.id, self.courses)