from monitors.repo_monitor import RepositoryMonitor
from typing import Optional
import requests

class GithubMonitor(RepositoryMonitor):
    """
    Github Monitor. This monitor checks for changes in a file on Github.
    """

    def __init__(
            self,
            api_key,
            owner,
            repo,
            file_name,
            interval=10,
            **kwargs
        ):
        super().__init__(interval)
        self.__api_key = api_key
        self.__owner = owner
        self.__repo = repo
        self.__file_name = file_name
        self.__current_hash = ""
    
    def check_repository(self):
        """
        Checks the file from the repository and sees if it has changed.
        """

        # Retrieve hash and compare it.
        file_hash = self.__retrieve_file_hash()
        if self.__current_hash != file_hash:
            self.__current_hash = file_hash
            return True
        else:
            return False

    def __retrieve_file_hash(
        self
    ) -> Optional[str]:
        """
        Makes a request to github to get the file hash.
        """

        url = f'https://api.github.com/repos/{self.__owner}/{self.__repo}/contents/{self.__file_name}'

        headers = {
            "Authorization": f'token {self.__api_key}'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            return data["sha"]
        else:
            raise Exception("Issue with retrieving github file_data.")
