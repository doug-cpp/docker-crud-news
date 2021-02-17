import json

from business.user_validation import UserValidation
from dao.user_dao import UserDao
from model.user_model import UserModel
from resources.logger_config import *
from resources.errors import *
from flask_jwt_extended import create_access_token
import datetime


class UserBusiness:

    """Classe responsável pela lógica de negócio do usuário. Executa validações,
        filtros e operações necessárias antes de enviar para a sua DAO, que irá
        operar com banco de dados"""

    validation = UserValidation()
    dao = UserDao()

    # Conecta e autentica o usuário, através do
    # fornecimento de credenciais
    def sign_in(self, user_json):
        if self.validation.validate_fields(user_json):
            email = user_json['email']
            user = self.dao.get_user_by_email(email)
            authorized = user.check_password(user_json['password'])

            if not authorized:
                logger.exception('Usuário não encontrado ou não autorizado')
                return json.dumps(errors['UnauthorizedError'])

            expires = datetime.timedelta(days=7)
            token = create_access_token(identity=str(user.id), expires_delta=expires)

            return json.dumps({'token': token, 'name': user.name})
        else:
            return json.dumps(errors['SchemaValidationError'])

    # ----------------------------------------------------------------

    def create_user(self, user_json):

        if self.validation.validate_fields(user_json):
            user = UserModel(**user_json)
            user.hash_password()
            user_json['password'] = user.password
            return self.dao.create_user(user_json)
        else:
            return json.dumps(errors['SchemaValidationError'])

    # ----------------------------------------------------------------
