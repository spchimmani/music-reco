# This file contains functions which generates recommendations based on algo

# The two main functions that send out cold start recos are:
# 1. get_user_genre_recommendations(user_genres) # genre based 
# 2. get_boosted_user_artist_recommendations(user_artists) # artist based

import os
import pandas as pd
import numpy as np

from dotenv import load_dotenv
load_dotenv()

def get_user_genre_vector(user_preferred_genres, csv_path=os.environ.get('GENRE_AVG_LATENT_FACTORS_PATH')):
    """
    Computes a user-genre vector as the mean latent factors across the user's preferred genres.

    Parameters:
    - user_preferred_genres (list of str): List of genres preferred by the user.
    - csv_path (str): Path to the CSV file containing average latent factors per genre.

    Returns:
    - np.array: A numpy array representing the aggregated user-genre vector.
                Returns None if no matching genres are found.
    """
    # Load the genre latent factors CSV
    df_genres = pd.read_csv(csv_path)
    
    # Filter the DataFrame for only the preferred genres.
    # Adjust case sensitivity or whitespace if needed.
    df_user_genres = df_genres[df_genres['genre'].isin(user_preferred_genres)]
    
    # If no matching genres, return None or raise an exception.
    if df_user_genres.empty:
        print("No matching genres found for the user preferences.")
        return None
    
    # Identify the latent factor columns (all columns except 'genre')
    latent_cols = [col for col in df_genres.columns if col != 'genre']
    
    # Compute the mean latent factor vector for the user:
    user_genre_vector = df_user_genres[latent_cols].mean(axis=0).values
    
    return user_genre_vector

def get_user_genre_recommendations(user_genres, track_factors_csv=os.environ.get('TRACK_FACTORS_PATH'), top_n=20):
    """
    Computes cosine similarity between the given user genre latent vector and each track's latent factor vector.
    Returns the top_n track recommendations with the highest cosine similarity.

    Parameters:
      user_genre_latent_factors (np.array): User's genre latent vector.
      track_factors_csv (str): Path to the CSV file with track latent factors.
      top_n (int): Number of top recommendations to return.

    Returns:
      pd.DataFrame: DataFrame containing track_id and similarity score for the top recommendations.
    """
    user_genre_latent_factors = get_user_genre_vector(user_genres)
    # Load the track latent factors CSV.
    df_tracks = pd.read_csv(track_factors_csv)
    
    # Identify latent factor columns (assumes all columns except 'track_id' are factors)
    latent_cols = [col for col in df_tracks.columns if col != 'track_id']
    
    # Extract track IDs and latent factors matrix
    track_ids = df_tracks['track_id'].values
    track_matrix = df_tracks[latent_cols].values.astype(float)
    
    # Normalize each track's latent factor vector.
    track_norms = np.linalg.norm(track_matrix, axis=1, keepdims=True)
    track_matrix_normalized = track_matrix / (track_norms + 1e-10)  # add small epsilon to avoid division by zero

    # Normalize the user genre latent vector.
    user_norm = np.linalg.norm(user_genre_latent_factors)
    user_vector_normalized = user_genre_latent_factors / (user_norm + 1e-10)
    
    # Compute cosine similarities as the dot product between user vector and each track vector.
    cosine_similarities = np.dot(track_matrix_normalized, user_vector_normalized)
    
    # Get indices of the top_n tracks with highest cosine similarity.
    top_indices = np.argsort(cosine_similarities)[::-1][:top_n]

    recommendations = pd.DataFrame({
        'track_id': track_ids[top_indices],
        'similarity': cosine_similarities[top_indices]
    })
    track_info = pd.read_csv(os.environ.get('MUSIC_INFO_PATH'))
    recommendations = recommendations.merge(track_info, on='track_id')
    return recommendations


def get_user_artist_vector(user_preferred_artists, csv_path=os.environ.get('ARTIST_AVG_LATENT_FACTORS_PATH')):
    """
    Computes a user-artist vector as the mean latent factors across the user's preferred artists.

    Parameters:
      user_preferred_artists (list of str): List of artists preferred by the user.
      csv_path (str): Path to the CSV file containing average latent factors per artist.

    Returns:
      np.array: A numpy array representing the aggregated user-artist vector.
                Returns None if no matching artists are found.
    """
    # Load the artist latent factors CSV
    df_artists = pd.read_csv(csv_path)
    
    # Filter the DataFrame for only the preferred artists.
    df_user_artists = df_artists[df_artists['artist'].isin(user_preferred_artists)]
    
    # If no matching artists, return None or raise an exception.
    if df_user_artists.empty:
        print("No matching artists found for the user preferences.")
        return None
    
    # Identify the latent factor columns (all columns except 'artist')
    latent_cols = [col for col in df_artists.columns if col != 'artist']
    
    # Compute the mean latent factor vector for the user:
    user_artist_vector = df_user_artists[latent_cols].mean(axis=0).values
    
    return user_artist_vector

def get_boosted_user_artist_recommendations(user_preferred_artists, 
                                            boost=1.0,
                                            track_factors_csv=os.environ.get('TRACK_FACTORS_PATH'), 
                                            music_info_csv=os.environ.get('MUSIC_INFO_PATH'), 
                                            top_n=20):
    """
    Generates song recommendations based on the user artist vector and applies a boost to songs 
    by the user’s preferred artists.
    
    The process is as follows:
      1. Load track latent factors from track_factors_csv.
      2. Compute cosine similarity between the (normalized) user_artist_vector and each song’s latent vector.
      3. If a song is by one of the user_preferred_artists, add a boost value to the similarity score.
      4. Sort all songs by the adjusted similarity score.
      5. Merge with track metadata from music_info_csv and return the top_n recommendations as a list of dictionaries.

    Parameters:
      user_artist_vector (np.array): Aggregated user artist latent vector.
      user_preferred_artists (list of str): List of artists the user has selected.
      boost (float): Boost value to add to songs by the preferred artists (default: 1.0).
      track_factors_csv (str): Path to CSV file of track latent factors (requires 'track_id' column).
      music_info_csv (str): Path to CSV file of track metadata (requires 'track_id' and 'artist' columns).
      top_n (int): Number of top recommendations to return.

    Returns:
      list of dict: Each dictionary contains track information (with an adjusted similarity score).
    """
    user_artist_vector = get_user_artist_vector(user_preferred_artists)
    # Load track latent factors
    df_tracks = pd.read_csv(track_factors_csv)
    latent_cols = [col for col in df_tracks.columns if col != 'track_id']
    
    # Extract track ids and latent factor matrix
    track_ids = df_tracks['track_id'].values
    track_matrix = df_tracks[latent_cols].values.astype(float)
    
    # Normalize track latent factors
    track_norms = np.linalg.norm(track_matrix, axis=1, keepdims=True)
    track_matrix_normalized = track_matrix / (track_norms + 1e-10)
    
    # Normalize the user artist vector
    user_norm = np.linalg.norm(user_artist_vector)
    user_vector_normalized = user_artist_vector / (user_norm + 1e-10)
    
    # Compute cosine similarities between user vector and each track vector
    cosine_similarities = np.dot(track_matrix_normalized, user_vector_normalized)
    
    # Create a DataFrame to hold the raw similarity scores along with track IDs
    df_sim = pd.DataFrame({
        'track_id': track_ids,
        'similarity': cosine_similarities
    })
    
    # Load track metadata (including artist info)
    df_info = pd.read_csv(music_info_csv)
    
    # Merge similarity scores with track metadata on 'track_id'
    df_merge = pd.merge(df_sim, df_info[['track_id', 'artist']], on='track_id', how='left')
    
    # Apply boost: add the boost value to the similarity score if the song's artist
    # is among the user's preferred artists.
    df_merge['adjusted_similarity'] = df_merge.apply(
        lambda row: row['similarity'] + boost if row['artist'] in user_preferred_artists else row['similarity'],
        axis=1
    )
    
    # Sort by adjusted similarity in descending order
    df_recs = df_merge.sort_values(by='adjusted_similarity', ascending=False).head(top_n)
    
    # Optionally, merge again with the full music info to retrieve all metadata (if needed)
    df_recs = pd.merge(df_recs, df_info, on='track_id', how='left')
    
    # Convert the resulting DataFrame to a list of dictionaries for output
    recommendations = df_recs.to_dict(orient='records')
    return recommendations
