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
    img_bytes = prediction.b64_to_bytes(data["image"])
    img_tensor = prediction.transform_image(img_bytes)
    model_name = data["modelName"]

    # choose model and get outputs
    model = MODELS[model_name]
    pred_prob, pred_label, pred_class = prediction.get_prediction(
        model, img_tensor
    )

    # # get saliency gradients
    # grads = plotting.get_saliency_grads(model, img_tensor)
    # fig = plotting.plot_saliency_grads(grads, img_tensor)
    # saliency_bytes = prediction.fig_to_bytes(fig)
    # saliency_b64 = prediction.bytes_to_b64(saliency_bytes)

    return {
        "prob": pred_prob,
        "label": pred_label,
        "class": pred_class,
        # "saliency_b64": saliency_b64,
    }
