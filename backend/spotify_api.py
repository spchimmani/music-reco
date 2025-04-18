import json
from dotenv import load_dotenv
import os
import requests
import base64
load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_string = f"{client_id}:{client_secret}"
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization" : f"Basic {auth_base64}",
        "Content-Type" : "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type" : "client_credentials"
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["access_token"]


def get_auth_header(token):
    return {
        "Authorization" : f"Bearer {token}"
    }

def get_artist_id(token, artist_name):
    url = f"https://api.spotify.com/v1/search?q={artist_name}&type=artist"
    response = requests.get(url, headers=get_auth_header(token))

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["artists"]["items"][0]["id"]

def get_artist_top_tracks(artist_id, token):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=IN"
    response = requests.get(url, headers=get_auth_header(token))

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["tracks"]

def get_browse_categories(token, headers):
    # create a url for limit = 30 to get 30 categories
    url = f"https://api.spotify.com/v1/browse/categories?limit=10"
    
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["categories"]["items"]

# function to generate an image of an artist
def get_artist_image(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}"
    response = requests.get(url, headers=get_auth_header(token))

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["images"][0]["url"]

def get_track_info(name, token):
    url = f"https://api.spotify.com/v1/search?q={name}&type=track"
    response = requests.get(url, headers=get_auth_header(token))

    if response.status_code != 200:
        print("Error: ", response.status_code)
        return None
    
    json_response = json.loads(response.content)
    return json_response["tracks"]["items"]

def get_global_top_tracks(token):
    def parse_top_tracks(response_json):
        tracks = []
        for item in response_json["items"]:
            track = item.get("track")
            if track:
                name = track.get("name")
                artists = [artist["name"] for artist in track.get("artists", [])]
                url = track.get("external_urls", {}).get("spotify")
                tracks.append({
                    "name": name,
                    "artists": artists,
                    "url": url
                })
        return tracks
    # Correct playlist ID for Spotify's "Top 50 - Global"
    playlist_id = "37i9dQZEVXbMDoHDwVN2tF"
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks?market=US"
    response = requests.get(url, headers=get_auth_header(token))

    if response.status_code != 200:
        print("Error:", response.status_code)
        print("Response:", response.text)
        return None
    else:
        json_response = json.loads(response.content)
        tracks = parse_top_tracks(json_response)
        for track in tracks:
            print(f"Track Name: {track['name']}")
            print(f"Artists: {', '.join(track['artists'])}")
            print(f"URL: {track['url']}")
            print()
    return None
    
token = get_token()
if token is None:
    print("Failed to get token")
else:
    print(get_global_top_tracks(token))
