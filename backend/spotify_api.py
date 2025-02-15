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

def get_tracks(artist_id, headers):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=IN"
    response = requests.get(url, headers=headers)

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


token = get_token() 
print(get_artist_image(token, get_artist_id(token, "Arijit Singh")))



