import requests
import json


def search_posts():


    root = "https://www.ensembledata.com/apis"
    endpoint = "/tt/keyword/search"
    params = {
        "name": "hydroflask review",
        "cursor": 0,
        "period": 1,
        "sorting": 0,
        "country": "us",
        "match_exactly": False,
        "get_author_stats": False,
        "token": "OfNfQ4DqKPIj23Yc"
    }


    res = requests.get(root + endpoint, params=params)
    data = json.dumps(res.json()['data']['data'][0]['aweme_info']['video']['play_addr']['url_list'][0], indent=4)

    loaded = json.loads(json.dumps(res.json()))

    print(data)
    print(loaded)

    for i in range (0,len(loaded['data']['data'])):
     print(json.dumps(res.json()['data']['data'][i]['aweme_info']['video']['play_addr']['url_list'][0]))

     
search_posts()