from abc import ABC, abstractmethod
from time import sleep

class RepositoryMonitor(ABC):
    """
    This is a Subject class that monitors a repository for changes.
    """
    
    def __init__(self, interval=10):
        """
        Constructor
        """
        self._observers = []
        self._running = True
        self._interval = interval

    def add_observer(self, observer):
        """
        Add an observer to notify.
        """
        self._observers.append(observer)

    def notify_observers(self):
        """
        Notify all observers
        """
        for observer in self._observers:
            observer.update()
    
    @abstractmethod
    def check_repository(self):
        """
        Abstract method for repositories
        """
        pass

    def run(self):
        """
        Run the monitor. Report changes to the observers.
        """
        if self.check_repository():
            self.notify_observers()
            
    def set_interval(self, interval):
        """
        Sets the interval
        """
        self._interval = interval
    
    def stop(self):
        """
        Stops the observer
        """
        self._running = False