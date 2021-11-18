import pytest
import requests

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