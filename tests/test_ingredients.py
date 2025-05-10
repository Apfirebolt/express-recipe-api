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


def test_create_ingredient(auth_token):
    url = "http://localhost:5000/api/ingredients"

    payload = {"recipe": "681efb084f212fa67920b8e7", "name": "Salt Black"}

    headers = {"Authorization": f"Bearer {auth_token}"}

    response = requests.post(url, json=payload, headers=headers)
    assert response.status_code == 201

    response_data = response.json()
    assert response_data["_id"] is not None
    assert response_data["name"] == "Salt Black"


def test_get_ingredients(auth_token):
    url = "http://localhost:5000/api/ingredients"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    assert isinstance(response_data, list)

    if response_data:
        first_ingredient = response_data[0]
        assert "_id" in first_ingredient
        assert "recipe" in first_ingredient
        assert "name" in first_ingredient
        assert "createdAt" in first_ingredient
        assert "updatedAt" in first_ingredient


def test_get_ingredient_by_id(auth_token):
    # Replace with a valid ingredient ID
    ingredient_id = "681efb124f212fa67920b8eb"
    url = f"http://localhost:5000/api/ingredients/{ingredient_id}"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the structure and content of the response
    assert response_data["_id"] == ingredient_id
    assert "recipe" in response_data
    assert "name" in response_data
    assert "createdAt" in response_data
    assert "updatedAt" in response_data
    assert response_data["name"] == "Salt"


def test_update_ingredient(auth_token):
    # Replace with a valid ingredient ID
    ingredient_id = "681efb124f212fa67920b8eb"
    url = f"http://localhost:5000/api/ingredients/{ingredient_id}"

    payload = {"name": "Updated Salt"}

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.put(url, json=payload, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the response structure and content
    assert "message" in response_data
    assert response_data["message"] == "Ingredient data updated successfully"
    assert "data" in response_data

    updated_data = response_data["data"]
    assert updated_data["_id"] == ingredient_id
    assert updated_data["name"] == "Updated Salt"
    assert "recipe" in updated_data
    assert "createdAt" in updated_data
    assert "updatedAt" in updated_data


def test_delete_ingredient(auth_token):
    # Replace with a valid ingredient ID
    ingredient_id = "681efb124f212fa67920b8eb"
    url = f"http://localhost:5000/api/ingredients/{ingredient_id}"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.delete(url, headers=headers)
    assert response.status_code == 204