from flask import request

from api import app
import json


@app.route("/predict", methods=["POST"])
def get_predictions():
    data = request.json
    print("DATA", data)
    response = {"server_response": data}
    return response
