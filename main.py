import requests
import json
import google.generativeai as genai
import os
import vertexai
from vertexai.generative_models import GenerativeModel, Part
from google.cloud import storage  # Import the Google Cloud Storage library
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
        "token": "gMgSPTsxoI1zhZZj"
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
    client = storage.Client(project=PROJECT_ID)
    bucket = client.get_bucket(bucket_name)
    for url in urls:

        #we should be able to used the passed in url, but for some reason does not work
        url = url.strip('""')
        url = url.strip("")
        response = requests.get(url)
        if response.status_code == 200:
            blob = bucket.blob(os.path.basename(url))
            blob.upload_from_string(response.content)
            
            print(f"Uploaded {os.path.basename(url)} to GCS")
        else:
            print(f"Failed to download {url}")


def gemini_single(url):
   # Define project information
    LOCATION = "us-central1"  # @param {type:"string"}

    # Initialize Vertex AI

    vertexai.init(project=PROJECT_ID, location=LOCATION)
    model = GenerativeModel(model_name="gemini-1.5-flash-001")

    prompt = """
    I am trying to find out whether a product is good based on a video review, summarize whether someone should buy this product and provide
    the different pros and cons of it. Tell me the song playing if you can.
    """

    video_file_uri = "gs://clio_storage/test1.mp4"
    video_file = Part.from_uri(video_file_uri, mime_type="video/mp4")
    print(video_file)
    

    contents = [video_file, prompt]

    response = model.generate_content(contents)
    print(response)


bucket_name = "clio_storage"

# Get video URLs
video_list = video_urls("hydroflask reviews")

# Download videos to Google Cloud Storage
download_to_gcs(video_list, bucket_name)

# Construct GCS URIs for downloaded videos
gcs_uris = [f"gs://{bucket_name}/{os.path.basename(url)}" for url in video_list]

# Run gemini_single for each GCS URI
for uri in gcs_uris:
    gemini_single(uri)


#ONLY ISSUE IS URL ISSUE