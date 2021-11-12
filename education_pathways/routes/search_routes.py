from flask.wrappers import Request
from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.courses import Course
from flask_msearch import Search
from marshmallow import Schema, fields
from ..models.resultSchema import resultSchema

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

@app.route('/search', methods=['GET'])
def searchTest():
  data = request.json
  sQuery = data['query']
  sFilters = data['filters']

  results = search.msearch(Course, query=sQuery, fields=['code', 'name', 'division', 'course_description', 'department', 'campus', 'term'], limit=10)

  if len(results) == 0:
    return jsonify(success=False, query=sQuery), 200

  results = unique_entries(results)

  if len(sFilters) > 0:
    results = filter_results(results, sFilters)

  result_schemas = []
  for i in results:
    print(i, flush=True)
    result_schema = resultSchema().dump(i)
    result_schemas.append(result_schema)
  return jsonify(success=True, query=sQuery, results = result_schemas), 200

def unique_entries(results):
  seen = set()
  clean_results = []
  for i in results:
    if i['code'] not in seen:
      clean_results.append(i)
      seen.add(i['code'])
  return clean_results

def filter_results(courses, filters, n_return=10):
  filtered_results = []
  
  # number of courses to return
  n_return = int(n_return)

  for course in courses:
    course_filtered = True
    for course_selector in filters.keys():
      if course_selector == "term":
        year, semester = filters["term"].split(" ")[:2]
        if year not in course[course_selector] and semester not in course[course_selector]:
          course_filtered = False
          break
      elif course_selector == "year":
        course_year = -1
        for i, char in enumerate(course["code"]):
          if char.isdigit():
            course_year = int(char)
            break
        if course_year != -1:
          if course_year == int(filters['year']):
            course_filtered = True
          else:
            course_filtered= False
      elif course[course_selector] != filters[course_selector]:
        course_filtered = False
        break
    if course_filtered:
      filtered_results.append(course)
  
  return filtered_results[:n_return+1]
