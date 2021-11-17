from .. import ma
from marshmallow import validates_schema, validate
from marshmallow.exceptions import ValidationError

class ResultSchema(ma.Schema):
    name = ma.String()
    code = ma.String()
    department = ma.String()
    division = ma.String()
    campus = ma.String()
    term = ma.String()
    id = ma.Int()
    course_description = ma.String()
