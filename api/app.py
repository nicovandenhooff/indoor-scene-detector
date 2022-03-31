from flask import Flask, jsonify, make_response, request

app = Flask(__name__)

if __name__ == "__main__":
    app.run(port="5000", debug=True, host="0.0.0.0")


@app.route("/", methods=["GET", "POST"])
def home():
    return {"hello": "HIIIII"}


# from ml import prediction

# MODELS = prediction.load_models()


@app.route("/api/v1.0/predict", methods=["GET"])
def get_predictions():

    print("HERE!!!!!")

    data = request.json
    # convert base 64 image to tensor
    # img_bytes = prediction.b64_to_bytes(data["newImage"])
    # img_tensor = prediction.transform_image(img_bytes)

    # model_name = data["network"]

    # # TODO: move network name to react
    # if data["network"] != "simple_cnn":
    #     model_name += "_" + data["transferLearning"]

    # # choose model and get outputs
    # model = MODELS[model_name]
    # pred_prob, pred_label, pred_class = prediction.get_prediction(
    #     model, img_tensor
    # )

    # predictions = {"prob": pred_prob, "label": pred_label, "class": pred_class}

    sample_response = {
        "items": [
            {"id": 1, "name": "Apples", "price": "$2"},
            {"id": 2, "name": "Peaches", "price": "$5"},
        ]
    }

    return sample_response


# from flask import Flask, jsonify, make_response

# app = Flask(__name__)


# @app.route("/api/v1.0/predict", methods=["GET"])
# def test_response():
#     """Return a sample JSON response."""
#     sample_response = {
#         "items": [
#             {"id": 1, "name": "Apples", "price": "$2"},
#             {"id": 2, "name": "Peaches", "price": "$5"},
#         ]
#     }
#     # JSONify response
#     response = make_response(jsonify(sample_response))

#     # Add Access-Control-Allow-Origin header to allow cross-site request
#     # response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"

#     # Mozilla provides good references for Access Control at:
#     # https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
#     # https://developer.mozilla.org/en-US/docs/Web/HTTP/Server-Side_Access_Control

#     return response
