from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

"""
Positive Legoset Retrieval Test
"""
def test_legoset_positive():
    response = client.get("/legoset/17931")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "message": "Successfully found legoset 17931",
        "results": {
            "legoset": {
                "id": 17931,
                "name": "Droideka",
                "set_number": "75381",
                "release_year": 2024,
                "pieces": 582.0,
                "num_minifigs": 1,
                "retired": False,
                "images": [
                    "https://imagedelivery.net/e9QbXi7FHwgziNweDoD9tw/78028b12-f700-4a52-36b2-6ca6dd0de200/public",
                    "https://imagedelivery.net/e9QbXi7FHwgziNweDoD9tw/92f65b34-7254-4e38-d11e-f9ad6dcf4600/public",
                    "https://imagedelivery.net/e9QbXi7FHwgziNweDoD9tw/ed86621d-eaca-41b4-a8de-1a1fc73def00/public"
                ]
            }
        }
    }

"""
Negative Legoset Retrieval Test
"""
def test_legoset_negative():
    response = client.get("/legoset/123")

    assert response.status_code == 404

    assert response.json() == {
        "success": False,
        "message": "Unable to complete request",
        "error": "Lego Set 123 Not Found"
    }



"""
Positive Search Test
"""
def test_search_positive():
    response = client.get("/search?query=Gabb&page=0&limit=20")

    assert response.status_code == 200

    assert response.json() == {
    "success": True,
    "message": "Successfully found Search Results",
    "results": {
        "search_results": [
            {
                "id": 18034,
                "display_image": None,
                "name": "Gabby's Party Room"
            },
            {
                "id": 18033,
                "display_image": None,
                "name": "Gabby's Kitty Care Ear"
            }
        ],
        "current_page": 0,
        "num_pages": 1
    }
}

"""
Negative Search Test
"""
def test_search_negative():
    response = client.get("/search?query=Gabb")

    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "type": "missing",
                "loc": [
                    "query",
                    "page"
                ],
                "msg": "Field required",
                "input": None
            }
        ]
    }