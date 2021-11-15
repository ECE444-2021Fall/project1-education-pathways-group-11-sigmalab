from marshmallow import Schema, fields


class resultSchema(Schema):
    name = fields.String()
    code = fields.String()
    department = fields.String()
    division = fields.String()
    campus = fields.String()
    term = fields.String()
    id = fields.Int()
    course_description = fields.String()
