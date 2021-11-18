from flask.wrappers import Request
from . import app, db
from flask import jsonify, request
from ..models.users import User
from ..models.courses import Course
from flask_msearch import Search
from marshmallow import Schema, fields
from ..models.resultSchema import resultSchema
from flask_cors import CORS

search=Search(db=db)
search.init_app(app)
CORS(app, resources={r"/*": {"origins":"*"}})

##Uncomment to delete search indexing
# search.delete_index()

##Uncomment to create search indexing (required on first run)
# search.create_index()

# Uncomment to update search indexing
# search.update_index()

@app.route('/api/search', methods=['POST'])
def getSearchResults():
  """POST request to get the search results based on a given query and filters."""
  data = request.json
  sQuery = data['query']
  sFilters = data['filters']
  searchLimit = 20

  results = search.msearch(Course, query=sQuery, fields=['code', 'name', 'division', 'course_description', 'department', 'campus', 'term'], limit=searchLimit)

  if len(results) == 0:
    return jsonify(success=False, query=sQuery), 200

  results = unique_entries(results)

  if len(sFilters) > 0:
    results = filter_results(results, sFilters, n_return=searchLimit)

  result_schemas = []
  for i in results:
    print(i, flush=True)
    result_schema = resultSchema().dump(i)
    result_schemas.append(result_schema)
  return jsonify(success=True, query=sQuery, results = result_schemas), 200

def unique_entries(results):
  """Prune non-unqiue search results."""
  seen = set()
  clean_results = []
  for i in results:
    if i['code'] not in seen:
      clean_results.append(i)
      seen.add(i['code'])
  return clean_results

def filter_results(courses, filters, n_return=10):
  """Apply specified filters to search results."""
  filtered_results = []
  
  # number of courses to return
  n_return = int(n_return)

  for course in courses:
    course_filtered = True
    for course_selector in filters.keys():
      if filters[course_selector] == "":
        continue
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
