import fastapi
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
