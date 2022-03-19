from dash import Dash, html, dcc

app = Dash(__name__)


# Display utility functions
def _merge(a, b):
    return dict(a, **b)


def _omit(omitted_keys, d):
    return {k: v for k, v in d.items() if k not in omitted_keys}


# Display components
def Header(title, headline):

    return html.Div(
        children=[
            html.H1(children=title),
            html.Div(children=headline),
        ],
        style={"textAlign": "center", "padding": 10, "width": "100%"},
    )


def Panel(children, **kwargs):

    return html.Div(
        children,
        style=_merge(
            {
                "padding": 20,
                "margin": 10,
                "borderRadius": 3,
                "backgroundColor": "#393E46",
            },
            kwargs.get("style", {}),
        ),
        **_omit(["style"], kwargs)
    )


def ImageUploader(id_string, children):

    return dcc.Upload(
        id=id_string,
        children=children,
        multiple=False,
        style={
            "width": "100%",
            "height": 40,
            "paddingTop": 20,
            "borderWidth": 1,
            "borderStyle": "dashed",
            "borderRadius": 5,
            "textAlign": "center",
            "marginBottom": 20,
            "backgroundColor": "#719FB0",
        },
    )
