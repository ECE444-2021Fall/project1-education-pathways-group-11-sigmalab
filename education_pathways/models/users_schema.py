from .. import ma
from .users import User
from .profiles_schema import ProfileSchema
from marshmallow.exceptions import ValidationError
from marshmallow import validates_schema

#### SCHEMA ####

class UserSchema(ma.SQLAlchemySchema):
  class Meta:
    model = User
  id = ma.auto_field()
  username = ma.auto_field()
  password= ma.auto_field()
  default_profile = ma.auto_field()
  profiles = ma.Nested(ProfileSchema, many=True)

  @validates_schema
  def validate_enough_info(self, data, **kwargs):
    if not (data.get('id') or data.get('username')):
      raise ValidationError('Need id or username to identify User')

user_schema = UserSchema()