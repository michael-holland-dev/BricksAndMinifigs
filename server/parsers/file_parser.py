from abc import ABC, abstractmethod

class CSVParser(ABC):
    """
    CSV Parser class, all parsers should inherit from this class.
    """
    def __init__(self):
        """
        Base class Constructor
        """
        self._csvs = {}
        self._update_db = None
        
    @abstractmethod
    def update_file(self, file_name, file):
        """
        Updates a csv in a csv dictionary.
        Cleans the file as well before applying. Then reparses based
        on the new data. 
        """

    @abstractmethod
    def parse(self):
        """
        Abstract parse method. Base classes must have it.
        """
        pass

    def add_update_db(self, update_db):
        """
        Update db function. This function will be called when the 
        parser is done parsing through the new files.
        """
        self._update_db = update_db