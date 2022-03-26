from dash import html, dcc
import generic_components as gc


def FormPanel(id_image, id_dropdown_image, id_radio):

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

    return gc.Panel(
        children=[
            html.H3(children="Upload an image"),
            gc.ImageUploader(
                id_image,
                html.Div(["Drag and Drop or ", html.A("Select Files")]),
            ),
            html.H5(children="Or select from dropdown"),
            dcc.Dropdown(
                id=id_dropdown_image,
                # value="",
                options=opt_dropdown_images,
                className="dropdown",
            ),
            html.H3(children="Select a network"),
            dcc.RadioItems(
                id=id_radio,
                options=opt_radio_network,
                value="simple",
                className="radio",
                inputStyle={"cursor": "pointer", "margin-bottom": "10px"},
            ),
            html.Button("Submit", id="submit-val", className="button"),
        ],
        style={
            "minWidth": "20%",
            "borderWidth": 2,
            "borderStyle": "solid",
            "borderColor": "#ECE9E9",
        },
    )
