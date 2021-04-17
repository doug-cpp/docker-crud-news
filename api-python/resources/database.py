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

    # app.config['MONGODB_DB'] = os.getenv('DB_NAME')
    # app.config['MONGODB_HOST'] = os.getenv('DB_HOST')
    # app.config['MONGODB_PORT'] = int(os.getenv('DB_PORT'))

    # app.config['MONGODB_SETTINGS'] = {
    #     'host': os.environ['DB_HOST'],
    #     'db': os.environ['DB_NAME']
    # }

    # client = MongoClient(os.environ['MONGODB_HOST'])

    app.config['MONGODB_SETTINGS'] = {
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD'],
        'db': os.environ['MONGODB_NAME']
    }

    db.init_app(app)
