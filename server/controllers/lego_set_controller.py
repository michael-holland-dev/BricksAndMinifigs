from database.lego_database import LegoDatabase
from controllers.controller import Controller
from typing import Dict, Optional
from models.legoset import LegoSet, get_by_id

class LegoSetController(Controller):
    """
    This controller maintains all of the logic necessary for the LegoSet routes.
    """

    def __init__(self, database: LegoDatabase):
        """
        Constructor 
        """
        super().__init__(database)

    def get_legoset(self, lego_set_id):
        """
        This function retrieves a lego by a specific id.
        """
        
        try:
            # Returns the selected legoset
            selected_legoset = get_by_id(lego_set_id, self._database)
            
            return selected_legoset
        except Exception as e:

            # Checks to see if the error is a key error.
            if type(e) == KeyError:
                raise Exception(f"Lego Set {lego_set_id} Not Found")
            else:
                # If not raise server exception
                raise e
    
    def get_lego_search_results(
            self,
            search_query: Optional[str],
            page: int,
            limit: int
        ):
        """
        This function returns all of the lego search results by the query and page, and limits the number of results per page.
        """

        if not search_query:
            return []
        
        search_query = search_query.lower()

        # Get all of the legosets from the database
        legosets: Dict[int, LegoSet] = self._database.get_all_legosets()

        # Filter and parse queried legosets
        queried_legosets = []
        for legoset in legosets.values():
            if search_query in legoset.name.lower() or search_query in legoset.set_number:
                legoset_json = legoset.to_json()
                queried_legosets.append({
                    "id":  legoset_json.get("id"),
                    "display_image": legoset_json.get("images")[0] if legoset_json.get("images") else None,
                    "name": legoset_json.get("name")
                })

        # Calculate the start and end indices for the pages.
        starting_index = page * limit
        ending_index = page * limit + limit


        return queried_legosets[starting_index : ending_index], page, (len(queried_legosets) // limit) + 1
