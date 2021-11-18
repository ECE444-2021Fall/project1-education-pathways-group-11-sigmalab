import pytest
import requests

from ..models.profiles import Profile
from ..models.users import User

user, password = "username_test", "password"
profile = "profile_test"

def test_create_user():
    url = "http://localhost:5000/createUser"
    data = {"username": user, "password": password}
    post = requests.post(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text

def test_validate_login():
    url = "http://localhost:5000/validateLogin"
    data = {"username": user, "password": password}
    post = requests.post(url, json = data)

    un_expected_response = '"message":"Invalid login details"'

    assert un_expected_response not in post.text

def test_create_profile():
    url = "http://localhost:5000/createProfile"
    data = {"username": user, "name": profile}
    post = requests.post(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text

def test_add_course():
    queried_user = User.query.filter_by(username="username_test").first()
    queried_profile = Profile.query.filter_by(creator_id=queried_user.id).first()

    url = "http://localhost:5000/addCourse"
    data =  {"profile_id": queried_profile.id, "course" : {"code": "CLA101H5", "session": "summer", "year": "2022"}}
    
    {"username": user, "name": profile}
    post = requests.post(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text

def test_delete_course():
    queried_user = User.query.filter_by(username=user).first()
    queried_profile = Profile.query.filter_by(creator_id=queried_user.id).first()

    url = "http://localhost:5000/deleteCourse"
    data =  {"profile_id": queried_profile.id,
        "course" : {
            "code": "CLA101H5",
            "session": "summer",
            "year": "2022"
        }
    }
    post = requests.post(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text

def test_delete_profile():
    url = "http://localhost:5000/deleteProfile"
    data = {"username": user, "name": profile}
    post = requests.delete(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text

def test_delete_user():
    url = "http://localhost:5000/deleteUser"
    data = {"username": user, "password": password}
    post = requests.delete(url, json = data)

    expected_response = '"success": true'

    assert expected_response in post.text