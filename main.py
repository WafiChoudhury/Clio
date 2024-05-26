import requests
import json
import google.generativeai as genai
import os
import vertexai
from vertexai.generative_models import GenerativeModel, Part

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


def transcripts_from_videoURLS(video_urls):
    for url in video_urls:
        return


def gemini_single(url):
   # Define project information
    PROJECT_ID = "unified-firefly-351003"  # @param {type:"string"}
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




video_list = video_urls("hydroflask reviews")
for vid in video_list:
    gemini_single(vid)
