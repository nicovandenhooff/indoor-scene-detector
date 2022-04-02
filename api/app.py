from flask import Flask, request
from flask_cors import CORS, cross_origin
from ml import prediction

app = Flask(__name__)
CORS(app)

# MODELS = prediction.load_models()

# if __name__ == "__main__":
#     app.run(port="5001", debug=True, host="0.0.0.0")


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def home():
    return {"hello": "HIIIII"}


# @app.route("/api/v1.0/predict", methods=["POST"])
# @cross_origin()
# def get_predictions():
#     data = request.json
#     img_bytes = prediction.b64_to_bytes(data["newImage"])
#     img_tensor = prediction.transform_image(img_bytes)

#     model_name = data["network"]

#     # TODO: move network name to react
#     if data["network"] != "simple_cnn":
#         model_name += "_" + data["transferLearning"]

#     # choose model and get outputs
#     model = MODELS[model_name]
#     pred_prob, pred_label, pred_class = prediction.get_prediction(model, img_tensor)

#     return {"prob": pred_prob, "label": pred_label, "class": pred_class}
