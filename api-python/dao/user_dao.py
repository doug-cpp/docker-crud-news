from model.user_model import UserModel
from mongoengine.errors import DoesNotExist, NotUniqueError, FieldDoesNotExist
from resources.logger_config import *
from resources.errors import *

import json


class UserDao:
    """Classe responsável por operar diretamente com o banco de dados do usuário.
        As informações manipuladas aqui já foram devidamente filtradas e
        validadas por sua classe business"""

    def get_user_by_email(self, email):
        try:
            return UserModel.objects.get(email=email)

        except DoesNotExist as notExistErr:
            logger.exception('******** Erro ao antenticar o usuário: ' + str(email))
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['UnauthorizedError'])
        except Exception as genericErr:
            logger.exception('******** Erro ao autenticar o usuário: ' + str(email))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

    def create_user(self, req):
        try:
            user_resp = UserModel(**req).save()
            return json.dumps({'id': str(user_resp.id)})

        except NotUniqueError as notUniqueErr:
            logger.exception('******** Erro ao criar um usuário: ' + str(req))
            logger.exception('Trace: ' + str(notUniqueErr) + '\n')
            return json.dumps(errors['EmailAlreadyExistsError'])
        except FieldDoesNotExist as notExistErr:
            logger.exception('******** Erro ao criar um usuário: ' + str(req))
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['FieldDoesNotExist'])
        except SchemaValidationError as schemaVal:
            logger.exception('******** Erro ao criar um usuário: ' + str(req))
            logger.exception('Trace: ' + str(schemaVal) + '\n')
            return json.dumps(errors['SchemaValidationError'])
        except Exception as genericErr:
            logger.exception('******** Erro ao criar um usuário: ' + str(req))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])
