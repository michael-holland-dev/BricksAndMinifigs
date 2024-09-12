from parsers.file_parser import CSVParser
from models.legoset import create_legoset
import numpy as np

class LegoParser(CSVParser):
    """
    This parser parses the Lego CSVs
    """
    def __init__(self):
        """
        Lego parser constructor.
        """
        super().__init__()

    def update_file(self, file_name, file):
        # Replace np.nans with null and stores it in memory based on file name.
        file = file.replace({np.nan: None})
        self._csvs[file_name] = file
        self.parse()

    def parse(self):
        """
        Parses through the lego csvs and then updates a database.
        """
        legoset_csv = self._csvs.get("project-lego_sets.csv")
        images_csv = self._csvs.get("project-lego_set_images.csv") 
        if legoset_csv is not None and images_csv is not None and self._update_db:
            self.legosets = {}

            for legoset in legoset_csv.to_dict('records'):
                self.legosets[legoset["id"]] = create_legoset(legoset)
                
            # Iterates through the 
            for image in images_csv.to_dict('records'):
                selected_legoset = self.legosets.get(int(image["lego_set_id"]))
                
                if selected_legoset:
                    selected_legoset.set_image(image["image_url"])
        
            self._update_db(self.legosets)

