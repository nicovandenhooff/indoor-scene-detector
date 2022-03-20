from dash import Dash, html, dcc, Input, Output, State

import generic_components as dc
from components import FormPanel

import base64
from PIL import Image

import plotly.express as px

app = Dash(__name__)


app.layout = html.Div(
    children=[
        dc.Header("Indoor Image Recognition", "A dashboard for things"),
        html.Div(
            children=[
                FormPanel("upload-image", "dropdown-image", "radio-network"),
                dc.Panel(
                    children=[html.Img(id="image", className="image")],
                    className="image_panel",
                ),
                dc.Panel(
                    children=[html.Div()],
                    className="output_panel",
                ),
            ],
            className="body",
        ),
    ],
    className="page",
)


@app.callback(
    Output("image", "src"),
    Input("upload-image", "contents"),
    Input("dropdown-image", "value"),
)
def update_output(contents, image_id):
    if contents is not None:
        return contents
    elif image_id is not None:
        image_filename = f"data/imgs/{image_id}.png"
        image = open(image_filename, "rb").read()

        encoded_image = base64.b64encode(image).decode("ascii")
        image_src = "data:image/png;base64,{}".format(encoded_image)
        return image_src
    else:
        None


if __name__ == "__main__":
    app.run_server(debug=True, port=8051)
