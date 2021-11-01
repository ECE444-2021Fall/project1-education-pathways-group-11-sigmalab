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