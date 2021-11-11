from sqlalchemy.orm.session import SessionTransaction
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

  course = db.relationship('Course', uselist=False, lazy=False)
  profile = db.relationship('Profile', backref='course_associations', lazy=True)
  
  session = db.Column(db.String(12))
  year = db.Column(db.Integer)

class Profile(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40))

  # User-related fields
  creator_id = db.Column(db.Integer,  \
    db.ForeignKey('user.id', onupdate="CASCADE", ondelete="CASCADE"), \
    nullable=False)
  creator = db.relationship('User', back_populates='profiles', uselist=False)

  # Course-related fields
  courses = db.relationship('Course', secondary='course_profile_a',\
    lazy='subquery', viewonly=True)

  def profile_sessions(self):
    associations = self.course_associations
    schedule = list()
    for asc in associations:
      year = (i for i, y in enumerate(schedule) if y.get('year') and y['year'] == asc.year)
      year = next(year, None)
      if year is None:
        schedule.append({'year': asc.year, 'sessions': []})
        year = len(schedule)-1
      session = (i for i, s in enumerate(schedule[year]['sessions'])\
        if s.get('name') and s['name'] == asc.session)
      session = next(session, None)
      if session is None:
        schedule[year]['sessions'].append\
          ({'name': asc.session, 'courses': []})
        session = len(schedule[year]['sessions'])-1
      schedule[year]['sessions'][session]['courses']\
        .append({'id': asc.course.id, 'code': asc.course.code})
    return schedule

  def add_courses(self, course_list: list[tuple[Course, str, int]])->None:
    for course, session, year in course_list:
      course_association = Course_Profile_A(session=session, course=course, \
        year=year)
      self.course_associations.append(course_association)
  
  def add_course(self, course: Course, session: str)-> None:
    course_association = Course_Profile_A(session=session, course=course)
    self.course_associations.append(course_association)
  
  def __repr__(self):
    return '<Profile {}: {}, courses={}>'.format(self.id, self.name, self.courses)
