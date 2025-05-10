import pytest
import requests


@pytest.fixture
def auth_token():
    url = "http://localhost:5000/api/users/login"

    payload = {
        "email": "aspper20@gmail.com",
        "password": "pass12345",
    }

    response = requests.post(url, json=payload)
    assert response.status_code == 200  # Ensure login is successful
    response_data = response.json()
    return response_data["token"]  # Return the token


# def test_create_recipe(auth_token):
#     url = "http://localhost:5000/api/recipes"

#     payload = {
#         "title": "Spaghetti",
#     }

#     headers = {"Authorization": f"Bearer {auth_token}"}
#     response = requests.post(url, json=payload, headers=headers)
#     assert response.status_code == 201
#     response_data = response.json()

#     # Validate the response data
#     assert "title" in response_data
#     assert response_data["title"] == "Spaghetti"
#     assert "_id" in response_data


def test_get_recipes(auth_token):
    url = "http://localhost:5000/api/recipes"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the response data
    assert isinstance(response_data, list)
    assert len(response_data) > 0

    for recipe in response_data:
        assert "_id" in recipe
        assert "user" in recipe
        assert "title" in recipe
        assert "createdAt" in recipe
        assert "updatedAt" in recipe
        assert "__v" in recipe

    
def test_get_recipe_by_id(auth_token):
    url = "http://localhost:5000/api/recipes/681eea5cb491240630690a0f"  # Replace with a valid recipe ID

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the response data
    assert "title" in response_data
    assert response_data["title"] == "Spaghetti"
    assert "ingredients" in response_data
    assert isinstance(response_data["ingredients"], list)
    assert "steps" in response_data
    assert isinstance(response_data["steps"], list)
    assert "pictures" in response_data
    assert isinstance(response_data["pictures"], list)
