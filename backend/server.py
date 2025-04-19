from typing import List
import fastapi
from pydantic import BaseModel
import uvicorn
from spotify_api import get_token, get_artist_id, get_artist_image, get_track_info
from fastapi.middleware.cors import CORSMiddleware
from cold_start_reco import get_user_genre_recommendations, get_boosted_user_artist_recommendations
app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#define a pydantic model for user-preferences regarding his favorite artists and genres

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


@app.get("/coldstart_genre_recommendations")
def get_coldstart_genre_reco(user_genres: List[str] = fastapi.Query(...)):
    def convert_recommendations_df(df):
        """
        Convert a DataFrame of recommendations into a list of dicts.
        For each row in the DataFrame, generate a simple index (starting at 1),
        extract the recommendation name, and look up the image URL via the Spotify API.

        Args:
            df (pandas.DataFrame): DataFrame returned by get_user_genre_recommendations.

        Returns:
            list: A list of dictionaries with keys 'id', 'name', 'image', 'artist', and 'duration'.
        """
        recommendations = []

        # Use enumerate with start=1 to generate a simple index for each recommendation.
        for idx, (_, row) in enumerate(df.iterrows(), start=1):
            # spotify track id can be extracted from the row -- row['spotify_id']
            # spotidy preview url can be extracted from the row -- row['spotify_preview_url'] but it is not working
            spotify_track_id = row['spotify_id']
            track_info = get_track_info(spotify_track_id, token)
            recommendations.append({
                'id': idx,           # Simple index starting at 1.
                'name': row['name'],
                'image': track_info["album"]["images"][0]["url"],  # Image URL from the track info.
                'artist': row['artist'],
                'duration': row['duration_ms'],  # Duration in milliseconds.
            })
        
        return recommendations
    
    coldstart_genre_recos = get_user_genre_recommendations(user_genres)
    # Convert the recommendations DataFrame to a list of dictionaries.
    coldstart_genre_recos = convert_recommendations_df(coldstart_genre_recos)
    return {
        "coldstart_genre_recos": coldstart_genre_recos
    }

@app.get("/coldstart_artist_recommendations")
def get_coldstart_artist_reco(user_artists: List[str] = fastapi.Query(...)):
    def convert_recommendations(recos):
        """
        Convert the recommendation(s) returned from get_boosted_user_artist_recommendations into a list
        of dictionaries with keys 'id', 'name', and 'image'. This function works whether recos is a single dict
        or a list of dicts.
        """
        recommendations = []
        # Ensure recos is a list
        if isinstance(recos, dict):
            recos = [recos]

        for idx, rec in enumerate(recos, start=1):
            spotify_track_id = rec['spotify_id']
            track_info = get_track_info(spotify_track_id, token)
            recommendations.append({
                "id": idx,       # Sequential index starting at 1.
                "name": track_info["name"],
                "image": track_info["album"]["images"][0]["url"],  # Image URL from the track info.
                "duration": track_info["duration_ms"],  # Duration in milliseconds.
                "artist": track_info["artists"][0]["name"],  # First artist name.
            })
        return recommendations

    # Get boosted artist recommendations which now returns a dict (or possibly a list of dicts)
    boosted_artist_recos = get_boosted_user_artist_recommendations(user_artists)
    boosted_artist_recos_converted = convert_recommendations(boosted_artist_recos)
    return {
        "coldstart_artist_recos": boosted_artist_recos_converted
    }