from flask import request

# from ..ml import prediction
from ml import prediction, training

from api import app
import json
import base64
import torch


@app.route("/predict", methods=["POST"])
def get_predictions():

    device = "cuda" if torch.cuda.is_available() else "cpu"

    data = request.json
    # print("DATA", data)

    img_b64 = data["newImage"].split(",")[1]
    img_bytes = base64.b64decode(img_b64)
    img_tensor = prediction.transform_image(img_bytes)

    if data["network"] == "alexnet":
        model = training.get_custom_densenet121(n_classes=10, pretrained=False)
        training.load_weights(
            model,
            "/Users/nicovandenhooff/Dropbox/GITHUB/cnn-dashboard/server/ml/model_weights/DenseNet121_Tuned.pth",
            device,
        )

    pred_prob, pred_label, pred_class = prediction.get_prediction(model, img_tensor)

    return {"prob": pred_prob, "label": pred_label, "class": pred_class}

    # response = {"server_response": data}
    # return response
