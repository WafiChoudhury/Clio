import requests
import json
import google.generativeai as genai
import os
import vertexai
from vertexai.generative_models import GenerativeModel, Part
from google.cloud import storage  # Import the Google Cloud Storage library
from random import randint, randrange

PROJECT_ID = "unified-firefly-351003"  # @param {type:"string"}

def video_urls(search_term):

    root = "https://www.ensembledata.com/apis"
    endpoint = "/tt/keyword/search"
    params = {
        "name": search_term,
        "cursor": 0,
        "period": 1,
        "sorting": 0,
        "country": "us",
        "match_exactly": False,
        "get_author_stats": False,
        "token": "JDFhb6unyM5ocLXC"
    }


    res = requests.get(root + endpoint, params=params)
    data = json.dumps(res.json()['data']['data'][0]['aweme_info']['video']['play_addr']['url_list'][0], indent=4)
    
    loaded = json.loads(json.dumps(res.json()))

    video_urls = []
    for i in range (0,len(loaded['data']['data'])):
        data = json.dumps(res.json()['data']['data'][i]['aweme_info']['video']['play_addr']['url_list'][0])
        video_urls.append(data)
    return video_urls


from google.cloud import storage


#FIX URL ISSUE, request.get(url) fails because of some hidden char or other error, works when you manually type it in 
def download_to_gcs(urls, bucket_name):
    file_names = []
    client = storage.Client(project=PROJECT_ID)
    bucket = client.get_bucket(bucket_name)
    for url in urls:

        #we should be able to used the passed in url, but for some reason does not work
        url = url.strip('""')
        url = url.strip("")
        file_name = "VID"+str(randint(100, 999))+".mp4"
        file_names.append(file_name)
        response = requests.get(url)
        if response.status_code == 200:
            
            blob = bucket.blob(file_name)
            blob.upload_from_string(response.content, content_type='video/mp4')
            
            print(f"Uploaded {file_name} to GCS")
        else:
            print(f"Failed to download {url}")
    return file_names

def gemini_single(uri):
   # Define project information
    LOCATION = "us-central1"  # @param {type:"string"}

    # Initialize Vertex AI

    vertexai.init(project=PROJECT_ID, location=LOCATION)
    model = GenerativeModel(model_name="gemini-1.5-flash-001")

    prompt = """
    I am trying to find out whether a product is good based on a video review, summarize whether someone should buy this product and provide
    the different pros and cons of it. Tell me the song playing if you can.
    """
    video_file = Part.from_uri(uri, mime_type="video/mp4")
    
    contents = [video_file, prompt]

    response = model.generate_content(contents)
    print(response)


bucket_name = "clio_storage"

# Get video URLs
video_list = video_urls("cerave cleanser reviews")

# Download videos to Google Cloud Storage
file_names = download_to_gcs(video_list, bucket_name)

# Construct GCS URIs for downloaded videos
gcs_uris = [f"gs://{bucket_name}/{url}" for url in file_names]



# Run gemini_single for each GCS URI
for uri in gcs_uris:
    print("URIS", uri)
    print(gemini_single(uri))

# gemini_single("r")