from flask import Flask, request
from flask_cors import CORS, cross_origin
from ml import prediction, plotting

app = Flask(__name__)
CORS(app)

MODELS = prediction.load_models()

if __name__ == "__main__":
    app.run(port="5000", debug=True)


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def home():
    return {"hello": "HIIIII"}


@app.route("/api/predict", methods=["POST"])
@cross_origin()
def get_predictions():
    data = request.json
    img_bytes = prediction.b64_to_bytes(data["newImage"])
    img_tensor = prediction.transform_image(img_bytes)

    model_name = data["network"]

    # TODO: move network name to react
    if data["network"] != "simple_cnn":
        model_name += "_" + data["transferLearning"]

    # choose model and get outputs
    model = MODELS[model_name]

    # TODO: To only keep one of the predictions below, to discuss with mel
    # I think it's better to keep the latter since it returns arrays
    # Then in the FE we can just index these arrays?
    pred_prob, pred_label, pred_class = prediction.get_prediction(model, img_tensor)
    pred_probs, pred_labels, pred_classes = prediction.get_topk_predictions(
        model, img_tensor, k=3
    )

    # get saliency plot and convert to base64
    grads = plotting.get_saliency_grads(model, img_tensor)
    fig = plotting.plot_saliency_grads(grads, img_tensor)
    saliency_bytes = prediction.fig_to_bytes(fig)
    saliency_b64 = prediction.bytes_to_b64(saliency_bytes)

    # TODO: Same comment as line 36, to update this based on what we keep
    return {
        "prob": pred_prob,
        "label": pred_label,
        "class": pred_class,
        "probs": pred_probs,
        "labels": pred_labels,
        "classes": pred_classes,
        "saliency_b64": str(saliency_b64),
    }
