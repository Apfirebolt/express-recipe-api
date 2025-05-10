import requests
import pytest


# def test_create_user():
#     url = "http://localhost:5000/api/users"

#     payload = {
#         "email":"alpha@gmail.com",
#         "username": "Apfirebolt",
#         "password": "pass12345",
#     }

#     response = requests.post(url, json=payload)
#     assert (
#         response.status_code == 201
#     )  # Assuming 201 Created is the expected status code
#     response_data = response.json()

#     assert "_id" in response_data
#     assert response_data["username"] == payload["username"]
#     assert response_data["email"] == payload["email"]
#     assert "token" in response_data
#     assert not response_data["isAdmin"]


def test_create_user_with_existing_email():
    url = "http://localhost:5000/api/users"

    payload = {
        "email": "alpha@gmail.com",
        "username": "Apfirebolt",
        "password": "pass12345",
    }

    response = requests.post(url, json=payload)
    assert response.status_code == 400  # Assuming 400 Bad Request for duplicate email
    response_data = response.json()

    assert "message" in response_data
    assert response_data["message"] == "User already exists"


def test_create_user_with_invalid_payload():
    url = "http://localhost:5000/api/users"

    payload = {"email": "invalid-email", "username": "", "password": "short"}

    response = requests.post(url, json=payload)
    assert response.status_code == 400  # Assuming 400 Bad Request for invalid payload
    response_data = response.json()

    assert "message" in response_data
    assert response_data["message"] == "Invalid email address"


def test_user_login():
    url = "http://localhost:5000/api/users/login"

    payload = {
        "email": "aspper20@gmail.com",
        "password": "pass12345",
    }

    response = requests.post(url, json=payload)
    assert response.status_code == 200  # Assuming 200 OK for successful login
    response_data = response.json()

    assert "_id" in response_data
    assert response_data["username"] == "Apfirebolt"
    assert response_data["email"] == payload["email"]
    assert "token" in response_data
    assert not response_data["isAdmin"]
