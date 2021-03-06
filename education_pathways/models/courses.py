from .. import db


class Course(db.Model):
  __tablename__ = 'course'
  __searchable__= ['code', 'name', 'division', 'course_description', 'department', 'campus', 'term']
  id = db.Column(db.Integer, primary_key=True)
  code = db.Column(db.String(20), unique=True)
  name = db.Column(db.Text())
  division = db.Column(db.Text())
  course_description = db.Column(db.Text())
  department = db.Column(db.Text())
  pre_requisites = db.Column(db.Text())
  course_level = db.Column(db.Text())
  utsc_breadth = db.Column(db.Text())
  apsc_electives = db.Column(db.Text())
  campus = db.Column(db.Text())
  term = db.Column(db.Text())
  activity = db.Column(db.Text())
  last_updated = db.Column(db.Text())
  exclusion = db.Column(db.Text())
  utm_distribution = db.Column(db.Text())
  corequisite = db.Column(db.Text())
  recommended_preparation = db.Column(db.Text())
  arts_and_science_breadth = db.Column(db.Text())
  arts_and_science_distribution = db.Column(db.Text())
  later_term_course_details = db.Column(db.Text())
  course = db.Column(db.Text())
  fase_available = db.Column(db.Text())
  maybe_restricted = db.Column(db.Text())
  majors_outcomes = db.Column(db.Text())
  minors_outcomes = db.Column(db.Text())
  ai_pre_reqs = db.Column(db.Text())
  views = db.Column(db.Integer)

  def __repr__(self):
    return '<Course {}: {}>'.format(self.id, self.code)
