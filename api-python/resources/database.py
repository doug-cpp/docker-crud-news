import os
from flask_mongoengine import MongoEngine

db = MongoEngine()


def initialize_db(app):
    """Faz a configuração e inicialização adequada do banco de dados,
        usando as variáveis de ambiente (definidas no arquivo .env),
        de modo que o sistema possa ser manipulado de forma prática.
        A autenticação é feita com chave pública e privada, usando
        a biblioteca Json Web Token"""

    app.JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    app.secret_key = os.getenv('SECRET_KEY')

    app.config['MONGO_URI'] = 'mongodb://' \
                              + os.getenv('DB_HOST') \
                              + '/' + os.getenv('DB_NAME') \
                              + ':' + os.getenv('DB_PORT')

    # app.config['MONGODB_SETTINGS'] = {
    #     'host': os.getenv['DB_HOST'],
    #     'username': os.getenv['DB_USERNAME'],
    #     'password': os.getenv['DB_PASSWORD'],
    #     'db': 'webapp'
    # }


    db.init_app(app)
