from fastapi import FastAPI
from database.lego_database import LegoDatabase
from typing import Optional
from controllers.lego_set_controller import LegoSetController
import uvicorn
import json
from fastapi.middleware.cors import CORSMiddleware
from config import LegoConfig
from parsers.lego_parser import LegoParser
from observers.github_file_retriever import GithubFileRetriever
from monitors.github_monitor import GithubMonitor
import asyncio
from contextlib import asynccontextmanager


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Architecture
config = LegoConfig()
database = LegoDatabase()
parser = LegoParser()
parser.add_update_db(database.update_database)

retrievers = []
monitors = []

for file_name in config.files:
    retriever = GithubFileRetriever(
        config.owner,
        config.repo,
        config.branch,
        file_name
    )
    retriever.add_parser_callback(parser.update_file)
    retrievers.append(retriever)
    
    monitor = GithubMonitor(
        config.github_api_key,
        config.owner,
        config.repo,
        file_name
    )

    monitor.add_observer(retriever)
    monitors.append(monitor)

def run_monitors():
    for monitor in monitors:
        monitor.run()

run_monitors()

@app.get("/legoset/{id}")
def get_legoset(id: int):
    """
    This route retrieves a legoset by an id.
    """
    # run_monitors()

    controller = LegoSetController(database)
    try: 
        results = controller.get_legoset(id)
        return {
            "success": True,
            "message": f"Successfully found legoset {id}",
            "results": {
                "legoset": results
            }
        }
    except Exception as e: 
        return {
            "success": False,
            "message": "Unable to complete request",
            "error": str(e)
        }

@app.get("/search")
def search_legoset(page: int, query: Optional[str] = None, limit: int = 20):
    """
    This route retrieves a list of legosets based on a search parameter.
    """
    # run_monitors()
    controller = LegoSetController(database)
    try: 
        search_results, current_page, num_pages = controller.get_lego_search_results(query, page, limit)
        return {
            "success": True,
            "message": f"Successfully found Search Results",
            "results": {
                "search_results": search_results,
                "current_page": current_page,
                "num_pages": num_pages
            }
        }
    except Exception as e: 
        return {
            "success": False,
            "message": "Unable to complete request",
            "error": str(e)
        }

if __name__ == "__main__":
    print("Running Server")
    uvicorn.run(app, host="0.0.0.0", port=8000)
