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
    campus = ma.auto_field()
    term = ma.auto_field()
    last_updated = ma.auto_field()
    exclusion = ma.auto_field()
    corequisite = ma.auto_field()
    views = ma.auto_field()

courseSchema = CourseSchema()