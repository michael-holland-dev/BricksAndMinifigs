class Model():
    id: int
    
    def to_json(self):
        return self.__dict__
    