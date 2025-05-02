

import os
import requests
from dotenv import load_dotenv

load_dotenv()

LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")

def get_similar_tracks(track_name, artist_name, limit=10):
    url = "http://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "track.getsimilar",
        "track": track_name,
        "artist": artist_name,
        "api_key": LASTFM_API_KEY,
        "format": "json",
        "limit": limit
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("Failed to fetch similar tracks from Last.fm")
        print("Status:", response.status_code)
        print("Response:", response.text)
        return []

    data = response.json()
    similar_tracks = data.get("similartracks", {}).get("track", [])
    results = []

    for track in similar_tracks:
        results.append({
            "name": track.get("name"),
            "artist": track.get("artist", {}).get("name"),
            "image": track.get("image", [{}])[-1].get("#text")
        })


    return results
