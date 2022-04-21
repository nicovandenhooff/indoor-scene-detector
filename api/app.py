from flask import Flask, request
from flask_cors import CORS, cross_origin
from ml import prediction, plotting, utils

MODELS = prediction.load_models()

app = Flask(__name__)
CORS(app)


if __name__ == "__main__":
    app.run(port="5000", debug=True)


@app.route("/")
@cross_origin()
def hello():
    return {"message": "You've reached the Indoor Scenes Heroku Backend Point."}


@app.route("/api/predict", methods=["POST"])
@cross_origin()
def get_predictions():
    # get data and convert base64 to tensor
    data = request.json
    img_bytes = utils.b64_to_bytes(data["image"])
    img_tensor = utils.bytes_to_tensor(img_bytes)

    # choose model
    model_name = data["modelName"]
    model = MODELS[model_name]

    # get top 3 predictions then wrangle for FE
    pred_probs, pred_labels, pred_classes = prediction.get_topk_predictions(
        model, img_tensor, k=3
    )

    predictions = prediction.wrangle_topk_predictions(
        pred_probs, pred_labels, pred_classes
    )

    # get saliency plot and convert to base64
    grads = plotting.get_saliency_grads(model, img_tensor)
    fig = plotting.plot_saliency_grads(grads, img_tensor)
    saliency_bytes = utils.fig_to_bytes(fig)
    saliency_b64 = utils.bytes_to_b64(saliency_bytes)

    return {
        "predictions": predictions,
        "saliency_b64": str(saliency_b64),
    }
