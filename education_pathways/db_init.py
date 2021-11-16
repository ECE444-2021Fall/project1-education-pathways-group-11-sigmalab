import psycopg2
import pandas as pd

def serialize_array(arr):
    ret = " ".join(arr)
    if not ret:
        return "NULL"
    return ret

def de_serialize_array(array_str):
    return array_str.split(" ")

# connect to  PostgreSQL database, get connection
conn = psycopg2.connect(
    host="database", 
    dbname="postgres", 
    user="postgres", 
    password="postgres"
    )
cursor = conn.cursor()

# Re-Initialize database upon application stop and start 
drop_table = "DROP TABLE IF EXISTS course CASCADE"
cursor.execute(drop_table)

create_table = """
CREATE TABLE IF NOT EXISTS course(
    id                            SERIAL PRIMARY KEY,
    code                          VARCHAR(20) NOT NULL UNIQUE,
    name                          TEXT,
    division                      TEXT,
    course_description            TEXT,
    department                    TEXT,
    pre_requisites                TEXT,
    course_level                  TEXT,
    utsc_breadth                  TEXT,
    apsc_electives                TEXT,
    campus                        TEXT,
    term                          TEXT,
    activity                      TEXT,
    last_updated                  TEXT,
    exclusion                     TEXT,
    utm_distribution              TEXT,
    corequisite                   TEXT,
    recommended_preparation       TEXT,
    arts_and_science_breadth      TEXT,
    arts_and_science_distribution TEXT,
    later_term_course_details     TEXT,
    course                        TEXT,
    fase_available                TEXT,
    maybe_restricted              TEXT,
    majors_outcomes               TEXT,
    minors_outcomes               TEXT,
    ai_pre_reqs                   TEXT,
    views                         INT
)
"""

# initialize course data in PostgreSQL database
cursor.execute(create_table)

# de-pickle course data
df = pd.read_pickle('resources/df_processed.pickle').set_index('Code')

# iterate through all courses (course code, course info)

for course_code, course_attributes in df.iterrows():
    # storage for row to be inserted into database
    current_row = []

    #course code
    current_row.append(str(course_code))

    # course attributes
    current_row.append(str(course_attributes["Name"]))
    current_row.append(str(course_attributes["Division"]))
    
    # handle course descriptions
    course_desc = str(course_attributes["Course Description"])
    current_row.append(str(course_attributes["Course Description"])) #course_desc.replace("'", "''"))
    
    current_row.append(str(course_attributes["Department"]))
    current_row.append(serialize_array(course_attributes["Pre-requisites"]))
    current_row.append(str(course_attributes["Course Level"]))
    current_row.append(str(course_attributes["UTSC Breadth"]))
    current_row.append(str(course_attributes["APSC Electives"]))
    current_row.append(str(course_attributes["Campus"]))
    current_row.append(serialize_array(course_attributes["Term"]))
    current_row.append("NULL") # Activity, NULL for now
    current_row.append(str(course_attributes["Last updated"]))
    current_row.append(serialize_array(course_attributes["Exclusion"]))
    current_row.append(str(course_attributes["UTM Distribution"]))
    current_row.append(serialize_array(course_attributes["Corequisite"]))
    current_row.append(serialize_array(course_attributes["Recommended Preparation"]))
    current_row.append(str(course_attributes["Arts and Science Breadth"]))
    current_row.append(str(course_attributes["Arts and Science Distribution"]))
    current_row.append(str(course_attributes["Later term course details"]))
    current_row.append(str(course_attributes["Course"]))
    current_row.append(str(course_attributes["FASEAvailable"]))
    current_row.append(str(course_attributes["MaybeRestricted"]))
    current_row.append(serialize_array(course_attributes["MajorsOutcomes"]))
    current_row.append(serialize_array(course_attributes["MinorsOutcomes"]))
    current_row.append(serialize_array(course_attributes["AIPreReqs"]))
    
    # view count
    current_row.append("0")

    # formatting
    for i in range(len(current_row)):
        current_row[i] = current_row[i].replace("'", "''")
    

    # print(current_row)

    insert = """
    INSERT INTO course (
        code,
        name,
        division,
        course_description,
        department,
        pre_requisites,
        course_level,
        utsc_breadth,
        apsc_electives,
        campus,
        term,
        activity,
        last_updated,
        exclusion,
        utm_distribution,
        corequisite,
        recommended_preparation,
        arts_and_science_breadth,
        arts_and_science_distribution,
        later_term_course_details,
        course,
        fase_available,
        maybe_restricted,
        majors_outcomes,
        minors_outcomes,
        ai_pre_reqs,
        views
    ) VALUES (
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s',
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s',
        '%s'
    )
    """ % tuple(current_row)
    # print(insert)

    # insert row into table
    cursor.execute(insert)

cursor.execute("commit")

# close connection
cursor.close()
conn.close()