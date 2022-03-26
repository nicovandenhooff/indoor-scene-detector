from flask import Flask

app = Flask(__name__)
# app.config.from_pyfile("../config.py")

from api import routes

if __name__ == "__main__":
    app.run(port=5000, debug=True)
