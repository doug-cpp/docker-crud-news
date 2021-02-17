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

    # Configura e inicia o banco. Informações no arquivo resources/database.py
    initialize_db(app)

    # Cria a instância de configuração da lib Json Web Token (autenticação)
    jwt = JWTManager(app)

    # Configura a api, enviando um arquivo com classes de erro, definidas
    # para tratar exceções de forma previsível. Acesse o arquivo de erros em
    # resources/errors.py
    api = Api(app, errors=errors)

    # Configuração do acesso à API. Veja detalhes no arquivo api/routes.py
    config_routes(api)

    return app


if __name__ == '__main__':

    load_dotenv()
    port = os.getenv('PORT')
    debug = os.getenv('DEBUG')
    host = os.getenv('DB_HOST')
    environment = os.getenv('ENVIRONMENT')
    app = start_app()

    # Quando o sistema estiver em produção, configura as
    # threads e usa o serve() ao invés de app.run()
    if environment == constants.ENVIRONMENT_PROD:
        threads = os.getenv('THREADS')
        serve(app, host=host, port=port, threads=threads)
    else:
        app.run(host=host, port=port, debug=debug)
