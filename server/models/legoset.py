from typing import List
from models.model import Model

class LegoSet(Model):
    name: int
    set_number: int
    release_year: int
    pieces: int
    num_minifigs: int
    retired: bool
    images: List[str]

    def set_image(self, image_url):
        self.images.append(image_url)

    def to_json(self):
        json = self.__dict__
        if self.images:
            json["images"] = self.images

        return json

    def __repr__(self):
        return f"LegoSet(id={self.id}, name={self.name}, set_number={self.set_number})"
    
def create_legoset(data: dict):
    lego_set = LegoSet()
    for key, value in data.items():
        lego_set.__dict__[key] = value
    lego_set.images = []
    return lego_set

def get_by_id(id, database):
    return database.legosets[id]
    
if __name__ == "__main__":
    lego_set = create_legoset({"id": 18102, "name": "Bumblebee", "set_number": "10338", "release_year": 2024, "pieces": 950, "num_minifigs": 0, "retired": False})
    print(lego_set)