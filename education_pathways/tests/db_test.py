import psycopg2
import pytest

def test_db_populated():
    conn = psycopg2.connect(
        host="database", 
        database="postgres", 
        user="postgres", 
        password="postgres"
    )
    cursor = conn.cursor()

    cursor.execute("SELECT * from course_data")
    num_elems = 0
    for elem in cursor:
        num_elems+=1

    assert num_elems != 0

    cursor.close()
    conn.close()

# Youssef added:
def test_db_select_key():
    conn = psycopg2.connect(
        host="database", 
        database="postgres", 
        user="postgres", 
        password="postgres"
    )
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM course_data WHERE code='ENGB29H3'")
    for elem in cursor:
        assert elem[0] == 'Shakespeare and Film'
    
    cursor.close()
    conn.close()

# Alex added: 
def test_db_insert():
    conn = psycopg2.connect(
        host="database", 
        database="postgres", 
        user="postgres", 
        password="postgres"
    )
    cursor = conn.cursor()

    data = """
    ('test', 'Shakespeare and Film', 'University of Toronto Scarborough', 'The history of Shakespeare and (on) film is long, illustriousŸ??and prolific: there have been at least 400 film and television adaptations and appropriations of Shakespeare over the past 120 years, from all over the world. But how and why do different film versions adapt Shakespeare? What are the implications of transposing a play by Shakespeare to a different country, era, or even language? What might these films reveal, illuminate, underscore, or re-imagine about Shakespeare, and why? In this course, we will explore several different Shakespearean adaptations together with the plays they adapt or appropriate. We will think carefully about the politics of adaptation and appropriation; about the global contexts and place of Shakespeare; and about the role of race, gender, sexuality, disability, empire and colonialism in our reception of Shakespeare on, and in, film.Pre-1900 course.', 'English (UTSC)', 'ENGA11H3 ENGA10H3 ENGB70H3', '2', 'Arts, Literature & Language', 'Complementary Studies', 'Scarborough', '2022 Winter', 'NULL', '2021-07-06 13:15:03.0', 'NULL', 'nan', 'NULL', 'NULL', 'nan', 'nan', 'nan', '<a href=/course/ENGB29H3>ENGB29H3</a>', 'False', 'False', 'NULL', 'NULL', 'NULL')
    """

    sql = "INSERT into course_data values %s" % data
    cursor.execute(sql)

    cursor.execute("SELECT count(name) FROM course_data WHERE code='test'")

    for elem in cursor:
        assert elem[0] == 1
    
    cursor.execute("DELETE FROM course_data WHERE code='test'")

    cursor.close()
    conn.close()