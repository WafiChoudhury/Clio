from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def video_urls(search_term):
    root = "https://www.ensembledata.com/apis"
    endpoint = "/tt/keyword/search"
    params = {
        "name": search_term +"review",
        "cursor": 0,
        "period": 1,
        "sorting": 0,
        "country": "us",
        "match_exactly": False,
        "get_author_stats": False,
        "token": "JDFhb6unyM5ocLXC"
    }

    res = requests.get(root + endpoint, params=params)
    loaded = json.loads(json.dumps(res.json()))

    video_urls = []
    for i in range(len(loaded['data']['data'])):
        data = json.dumps(res.json()['data']['data'][i]['aweme_info']['video']['play_addr']['url_list'][0])
        video_urls.append(data)
    return video_urls

@app.route('/searchQueries', methods=['POST'])
def handle_search_query():
    data = request.json
    search_term = data['searchQuery']
    urls = video_urls(search_term)
    return jsonify({'videoUrls': urls})

if __name__ == '__main__':
    app.run(debug=True)
