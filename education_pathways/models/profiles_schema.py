from .. import ma
from .profiles import Course_Profile_A, Profile
from marshmallow.exceptions import ValidationError
from marshmallow import validates_schema, validate

#### SCHEMAS ####

# class UnformattedCourseSchema(ma.SQLAlchemySchema):
#   class Meta:
#     model = Course_Profile_A
#   course = ma.auto_field()
#   session = ma.auto_field()
#   class Meta:
#     ordered = True

class CourseSchema(ma.Schema):
  id = ma.Int()
  code= ma.Str()
class SessionSchema(ma.Schema):
  name = ma.Str(validate=validate. \
    OneOf(['fall', 'winter', 'summer', 'unassigned']))
  courses = ma.List(ma.Nested(CourseSchema))
class YearSchema(ma.Schema):
  year = ma.Int()
  sessions = ma.List(ma.Nested(SessionSchema))
# class ScheduleSchema(ma.Schema):


year_schema = YearSchema()
years_schema = YearSchema(many=True)

def not_blank_validator(data):
  if not data:
    raise ValidationError('Data not provided.')

class ProfileSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Profile
    ordered = True
  id = ma.auto_field(dump_only=True)
  name = ma.auto_field()
  creator_id = ma.auto_field(dump_only=True)
  creator_username = ma.Str()
  # courses = ma.Nested(CourseSchema, many=True)

  @validates_schema
  def validate_creator_exists(self, data, **kwargs):
    if not (data.get('creator_id') or data.get('creator_username')):
      raise ValidationError('No user info has been entered')

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True, exclude=['creator_id', 'creator_username'])