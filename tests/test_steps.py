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


def test_create_step(auth_token):
    url = "http://localhost:5000/api/steps"

    payload = {"recipe": "681efb084f212fa67920b8e7", "description": "Chop onions finely"}

    headers = {"Authorization": f"Bearer {auth_token}"}

    response = requests.post(url, json=payload, headers=headers)
    assert response.status_code == 201

    response_data = response.json()
    assert response_data["_id"] is not None
    assert response_data["description"] == "Chop onions finely"
    assert response_data["recipe"] == "681efb084f212fa67920b8e7"


def test_get_steps(auth_token):
    url = "http://localhost:5000/api/steps"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    assert isinstance(response_data, list)

    if response_data:
        first_step = response_data[0]
        assert "_id" in first_step
        assert "recipe" in first_step
        assert "description" in first_step


def test_get_step_by_id(auth_token):
    # Replace with a valid step ID
    step_id = "681efb124f212fa67920b8ec"
    url = f"http://localhost:5000/api/steps/{step_id}"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the structure and content of the response
    assert response_data["_id"] == step_id
    assert "recipe" in response_data
    assert "description" in response_data


def test_update_step(auth_token):
    # Replace with a valid step ID
    step_id = "681efb124f212fa67920b8ec"
    url = f"http://localhost:5000/api/steps/{step_id}"

    payload = {"description": "Updated step description"}

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.put(url, json=payload, headers=headers)
    assert response.status_code == 200
    response_data = response.json()

    # Validate the response structure and content
    assert "message" in response_data
    assert response_data["message"] == "Step data updated successfully"
    assert "data" in response_data

    updated_data = response_data["data"]
    assert updated_data["_id"] == step_id
    assert updated_data["description"] == "Updated step description"
    assert "recipe" in updated_data


def test_delete_step(auth_token):
    # Replace with a valid step ID
    step_id = "681efb124f212fa67920b8ec"
    url = f"http://localhost:5000/api/steps/{step_id}"

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.delete(url, headers=headers)
    assert response.status_code == 200

    response_data = response.json()
    assert "message" in response_data
    assert response_data["message"] == "Step removed"
