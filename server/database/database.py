from abc import ABC, abstractmethod

class Database(ABC):
    """
    Database Abstract Base Class
    """

    @abstractmethod
    def update_database(self,legosets):
        """
        Update database abstract method.
        """
        pass