import os
import requests
import json
from requests.exceptions import HTTPError

from flask import Blueprint, jsonify, session, request
from flask_login import login_required

client_routes = Blueprint('client', __name__)

NOWSTA_API_KEY = os.environ.get('NOWSTA_API_KEY')

NOWSTA_CLIENT_URL = 'https://api.nowsta.com/api/v1/coordinators/clients'
# NOWSTA_CLIENT_URL = 'https://jsonplaceholder.typicode.com/todos/1'


def parse_nowsta_clients(data):
    print(data)
    clients = data['objects']

    client_options = [{
        "label": client['name'],
        "value": client['id']
        } for client in clients]

    return jsonify(client_options)


@client_routes.route('', methods=['GET'])
@login_required
def load_all_clients():

    args = request.args

    opt_query = args.get("query")

    params = {
        "company": 1319
    }

    if opt_query is not None:
        params["query"] = opt_query

    try:
        response = requests.get(
        NOWSTA_CLIENT_URL,
        params=params,
        cookies={
            "_nowsta_api": NOWSTA_API_KEY
        }
    )
        # If the response was successful, no Exception will be raised
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Python 3.6
        return {"Error": http_err.response.status_code}
    except Exception as err:
        print(f'Other error occurred: {err}')  # Python 3.6
        return {"Error": err.message}
    else:
        print('Success!')
        # print(response.content)
        data = json.loads(response.content)
        return parse_nowsta_clients(data)
        # return "hello"
