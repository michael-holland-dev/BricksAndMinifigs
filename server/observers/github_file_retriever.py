from observers.observer import Observer
import pandas as pd

class GithubFileRetriever(Observer):
    """
    This observer retrieves files from github
    once triggered by the monitor.
    """

    def __init__(
            self,
            owner,
            repo,
            branch_name,
            file_name,
            **kwargs
        ):
        """
        Constructor
        """
        self.__owner = owner
        self.__repo = repo
        self.__branch_name = branch_name
        self.__file_name = file_name
        self.__parser_callback = None

    def add_parser_callback(self, parser_callback):
        """
        Adds a callback to call the parser when the file is retrieved.
        """
        self.__parser_callback = parser_callback

    def update(self):
        """
        Retrieves the file on the update and then sends it to the parser.
        """
        if self.__parser_callback:
            retrieved_file = pd.read_csv(f"https://raw.githubusercontent.com/{self.__owner}/{self.__repo}/{self.__branch_name}/{self.__file_name}")
            self.__parser_callback(self.__file_name, retrieved_file)