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