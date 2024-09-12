from abc import ABC, abstractmethod

class Observer(ABC):
    """
    Abstract Observer Class
    """
    
    @abstractmethod
    def update(self):
        """
        Abstract update method. Must be used by all observers.
        """
        pass
