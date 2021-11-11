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
  creator = db.relationship('User', back_populates='profiles', uselist=False)

  # Course-related fields
  courses = db.relationship('Course', secondary='course_profile_a',\
    lazy='subquery', viewonly=True)

  # def get_formatted_courses(self):
  #   associations = self.course_associations
  #   schedule=list()
  #   for assoc in associations:
  #     course_id, course_code, year, session = \
  #       assoc.course_id, assoc.course.code, assoc.year, assoc.session
  #     item = {'id':course_id, 'code': course_code}
  #     if filter(lambda x: (x.get('year') and x['year'] == year), schedule):
  #       if filter(lambda x: (x['year'].get('session') \
  #         and x['year']), schedule):
  #         pass
  #       schedule[year].append(item)
  #     else:
  #       schedule[year] = [item]
  #   return schedule
  
  # def del_formatted_courses(self):
  #   del self.__formatted_courses
  
  # profile_sessions = property(get_formatted_courses,None,del_formatted_courses)


  # @overload
  def add_courses(self, course_list: list[tuple[Course, str]])->None:
    for course, session in course_list:
      course_association = Course_Profile_A(session=session, course=course)
      self.course_associations.append(course_association)
  
  # @overload
  # def add_courses(self, course_list: list[tuple[int, str]])->None:
  #   # get the courses
  #   course_ids = []
  #   course_sessions = []

  #   for course in :
  #     course_ids.append(course['id'])
  #     course_sessions.append(course['session'])

  #   courses_query = Course.query.filter(Course.id.in_(course_ids)).all()
  #   courses = [(course,course_sessions[index]) \
  #     for index, course in enumerate(courses_query)]

  #   # newProfile = Profile(name=data['name'], creator=user)
  #   profile.add_courses(courses)
  #   pass

  def add_course(self, course: Course, session: str)-> None:
    course_association = Course_Profile_A(session=session, course=course)
    self.course_associations.append(course_association)
  
  def __repr__(self):
    return '<Profile {}: {}>'.format(self.id, self.courses)
