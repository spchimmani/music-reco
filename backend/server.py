import fastapi
from pydantic import BaseModel
import uvicorn
from spotify_api import get_token, get_artist_id, get_artist_image
from fastapi.middleware.cors import CORSMiddleware
app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#define a pydantic model for user-preferences regarding his favorite artists and genres
class UserPreferences(BaseModel):
    favorite_artists: list
    favorite_genres: list

token = get_token()

@app.get("/artists/{artist_name}")
def get_image(artist_name: str):
    artist_id = get_artist_id(token, artist_name)
    image_url = get_artist_image(token, artist_id)
    print("Hello", image_url)
    return {
        "artist_name" : artist_name,
        "image_url" : image_url
    }

@app.get("/user_preferences")
def get_coldstart_reco(user_preferences: UserPreferences):
    
    return {
        "coldstart_reco" : "Coldstart Reco"
    }