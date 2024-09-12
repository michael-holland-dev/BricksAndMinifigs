class LegoDatabase():
    """
    Lego Database Class. Stores all of the Lego Data
    """
    def __init__(self):
        """
        Constructor
        """
        super().__init__()
        self.legosets = {}
    
    def update_database(self,legosets):
        """
        Updates the database with a new legoset
        """
        self.legosets = legosets

    def get_all_legosets(self):
        """
        Gets all of the legosets from the database
        """
        return self.legosets