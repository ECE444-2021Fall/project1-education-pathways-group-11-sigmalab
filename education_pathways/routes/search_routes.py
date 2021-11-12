from flask.wrappers import Request
from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.courses import Course
from flask_msearch import Search
from marshmallow import Schema, fields

# https://programmerall.com/article/8033330201/
# https://tutorial101.blogspot# .com/2021/04/python-flask-blog-with-admin-using.html
search=Search(db=db)
search.init_app(app)


##Uncomment to delete 
# search.delete_index()
# search.delete_index(Course)
# ##Uncomment on first run
# search.create_index()
# search.create_index(Course)

# Uncomment to update
# search.update_index()
# search.update_index(Course)

class resultSchema(Schema):
    name = fields.String()
    code = fields.String()
    department = fields.String()
    division = fields.String()
    campus = fields.String()
    term = fields.String()
    id = fields.Int()
    course_description = fields.String()

class resultsSchema(Schema):
    results = fields.Nested(resultSchema)

# EXAMPLE: import the model used to create new rows in a table
@app.route('/searchTest', methods=['POST'])
def searchTest():
  data = request.json
  sQuery = data['query']
  
  # db.session.add(newUser)
  results = search.msearch(Course, query=sQuery, fields=['code', 'name', 'division', 'course_description', 'department', 'campus', 'term'], limit=10)
  #results = Course.query.msearch('ece444', fields=['code'], limit=2)
  # for attr in dir(results[0]):
  #   print("obj.%s = %r" % (attr, getattr(results, attr)), flush=True)

  # print(len(results), flush=False)
  # for i in results:
  #   print(i, flush=True)

  results = unique_entries(results)
  result_schemas = []
  for i in results:
    print(i, flush=True)
    result_schema = resultSchema().dump(i)
    result_schemas.append(result_schema)
  # try:
  #   pass
  #   #db.session.commit()
  # except:
  #   return jsonify(success=False), 400
  return jsonify(success=True, query=sQuery, results = result_schemas), 200

def unique_entries(results):
  seen = set()
  clean_results = []
  for i in results:
    if i['code'] not in seen:
      clean_results.append(i)
      seen.add(i['code'])
  return clean_results