from sqlalchemy.orm.session import SessionTransaction
from .. import db
from .courses import Course

# association table between courses and profiles
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
  public = db.Column(db.Integer, default=0, nullable=True)

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
        schedule.append({'year': asc.year, 'sessions': [{'name':s, 'courses': []} for s in ['fall', 'winter', 'summer']]})
        year = len(schedule)-1
      session = (i for i, s in enumerate(schedule[year]['sessions'])\
        if s.get('name') and s['name'] == asc.session)
      session = next(session, None)
      if session is None:
        schedule[year]['sessions'].append\
          ({'name': asc.session, 'courses': []})
        session = len(schedule[year]['sessions'])-1
      schedule[year]['sessions'][session]['courses']\
        .append({'id': asc.course.id, 'code': asc.course.code, 'views': asc.course.views})
    unassignedExists = (y for y in schedule if y['year'] == -1)
    unassignedExists = next(unassignedExists, None)
    if unassignedExists is None:
      schedule.insert(0, {'year': -1, 'sessions': [{'name': 'unassigned', 'courses':[]}]})
    return schedule

  def add_courses(self, course_list: list[tuple[Course, str, int]])->None:
    for course, session, year in course_list:
      self.add_course(course, session, year)
  
  def add_course(self, course: Course, session: str, year: int)-> None:
    course_association = Course_Profile_A(session=session, course=course, \
      year=year)
    self.course_associations.append(course_association)
  
  def __repr__(self):
    return '<Profile {}: {}, courses={}>'.format(self.id, self.name, self.courses)
