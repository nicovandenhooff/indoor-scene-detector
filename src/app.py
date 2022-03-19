from dash import Dash, html, dcc, Input, Output, State

import generic_components as dc

import base64
from PIL import Image


import plotly.express as px

app = Dash(__name__)


# Dropdown options
opt_dropdown_images = [
    {"label": "School", "value": "school"},
    {"label": "Bedroom", "value": "bedroom"},
]

opt_radio_network = [
    {"label": "Simple", "value": "simple"},
    {"label": "AlexNet", "value": "alexnet"},
    {"label": "ResNet", "value": "resnet"},
    {"label": "DenseNet", "value": "densenet"},
]


control_panel = dc.Panel(
    children=[
        html.H3(children="Upload an image"),
        dc.ImageUploader(
            "upload-image",
            html.Div(["Drag and Drop or ", html.A("Select Files")]),
        ),
        html.H5(children="Or select from dropdown"),
        dcc.Dropdown(
            id="image_id",
            value="school",
            options=opt_dropdown_images,
            className="dropdown",
        ),
        html.H3(children="Select a network"),
        dcc.RadioItems(
            options=opt_radio_network,
            value="simple",
            className="radio",
            inputStyle={"cursor": "pointer", "margin-bottom": "10px"},
        ),
        html.Button("Submit", id="submit-val", className="button"),
    ],
    className="control_panel",
)


image_panel = dc.Panel(
    children=[html.Img(id="image", className="image")],
    className="image_panel",
)

output_panel = dc.Panel(
    children=[html.Div()],
    className="output_panel",
)

body = html.Div(
    children=[control_panel, image_panel, output_panel], className="body"
)


app.layout = html.Div(
    children=[
        dc.Header("Indoor Image Recognition", "A dashboard for things"),
        body,
    ],
    className="page",
)


@app.callback(Output("image", "src"), [Input("image_id", "value")])
def update_output(image_id):
    image_filename = f"data/imgs/{image_id}.png"
    image = open(image_filename, "rb").read()

    encoded_image = base64.b64encode(image).decode("ascii")
    image_src = "data:image/png;base64,{}".format(encoded_image)
    return image_src


@app.callback(
    Output("image", "children"),
    Input("upload-image", "contents"),
    State("upload-image", "filename"),
    State("upload-image", "last_modified"),
)
def update_output(list_of_contents, list_of_names, list_of_dates):
    if list_of_contents is not None:
        children = [
            parse_contents(c, n, d)
            for c, n, d in zip(list_of_contents, list_of_names, list_of_dates)
        ]
        return children


if __name__ == "__main__":
    app.run_server(debug=True, port=8051)
