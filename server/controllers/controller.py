from abc import ABC

class Controller(ABC):
    """
    Base controller class, should be inherited by all future controllers.
    """
    def __init__(self, database):
        self._database = database