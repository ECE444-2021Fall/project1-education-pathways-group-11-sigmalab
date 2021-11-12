from .. import ma
from .courses import Course

class CourseSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Course
        ordered = True
    id = ma.auto_field()
    code = ma.auto_field()
    name = ma.auto_field()
    division = ma.auto_field()
    course_description = ma.auto_field()
    department = ma.auto_field()
    pre_requisites = ma.auto_field()
    course_level = ma.auto_field()
    utsc_breadth = ma.auto_field()
    apsc_electives = ma.auto_field()
    campus = ma.auto_field()
    term = ma.auto_field()
    activity = ma.auto_field()
    last_updated = ma.auto_field()
    exclusion = ma.auto_field()
    utm_distribution = ma.auto_field()
    corequisite = ma.auto_field()
    recommended_preparation = ma.auto_field()
    arts_and_science_breadth = ma.auto_field()
    arts_and_science_distribution = ma.auto_field()
    later_term_course_details = ma.auto_field()
    course = ma.auto_field()
    fase_available = ma.auto_field()
    maybe_restricted = ma.auto_field()
    majors_outcomes = ma.auto_field()
    minors_outcomes = ma.auto_field()
    ai_pre_reqs = ma.auto_field()