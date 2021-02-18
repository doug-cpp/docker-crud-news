import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_restful import Api
from waitress import serve

from resources import constants
from resources import errors
from resources.database import initialize_db

from api.routes import config_routes


def start_app():
    app = Flask(__name__)

    CORS(app)

    initialize_db(app)

    jwt = JWTManager(app)

    api = Api(app, errors=errors)

    config_routes(api)

    return app


if __name__ == '__main__':

    load_dotenv()
    port = os.getenv('PORT')
    debug = os.getenv('DEBUG')
    host = os.getenv('DB_HOST')
    environment = os.getenv('ENVIRONMENT')
    app = start_app()

    if environment == constants.ENVIRONMENT_PROD:
        threads = os.getenv('THREADS')
        serve(app, host='127.0.0.1', port=5000, threads=3)
    else:
        app.run(host=host, port=port, debug=debug)
