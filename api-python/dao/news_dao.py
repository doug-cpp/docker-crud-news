from model.news_model import NewsModel
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, SaveConditionError
from resources.logger_config import *
from resources.errors import *
import json


class NewsDao:
    """Classe responsável por operar diretamente com o banco de dados das notícias
        As informações manipuladas aqui já foram devidamente filtradas e
        validadas por sua classe business"""

    # Ao criar uma notícia, retorna o objeto completo da mesma.
    def create_news(self, req):
        try:
            return NewsModel(**req).save().to_json()

        except FieldDoesNotExist as notExistErr:
            logger.exception('******** Erro ao criar uma notícia: ' + str(req))
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['FieldDoesNotExist'])
        except Exception as genericErr:
            logger.exception('******** Erro ao criar uma notícia: ' + str(req))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

    def get_all_news(self):
        try:
            return NewsModel.objects.all().to_json()

        except DoesNotExist as notExistErr:
            logger.exception('******** Erro ao tentar ler todas as notícias')
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['DoesNotExist'])
        except Exception as genericErr:
            logger.exception('******** Erro ao tentar ler todas as notícias')
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

    def get_news(self, id):
        try:
            return NewsModel.objects.get(id=id).to_json()

        except DoesNotExist as notExistErr:
            logger.exception('******** Erro ao ler a notícia id: ' + str(id))
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['DoesNotExist'])

        except Exception as genericErr:
            logger.exception('******** Erro ao ler a notícia id: ' + str(id))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

    def delete_news(self, id):
        try:
            NewsModel.objects.get(id=id).delete()
            return json.dumps({'id': id})

        except DoesNotExist as notExistErr:
            logger.exception('******** Erro ao excluir a notícia id: ' + str(id))
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['DoesNotExist'])
        except Exception as genericErr:
            logger.exception('******** Erro ao excluir a notícia id: ' + str(id))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

    # Retorna o objeto com sua mudança.
    def update_news(self, id, req):
        try:
            success = NewsModel.objects.get(id=id).update(**req)
            if success:
                return NewsModel.objects.get(id=id).to_json()
            else:
                return json.dumps(errors['DoesNotExist'])

        except SaveConditionError as saveConditionErr:
            logger.exception('******** Erro ao atualizar a notícia, id: ' + str(id)) + str(req)
            logger.exception('Trace: ' + str(saveConditionErr) + '\n')
            return json.dumps(errors['SaveConditionError'])
        except DoesNotExist as notExistErr:
            logger.exception('******** Erro ao atualizar a notícia, id: ' + str(id)) + str(req)
            logger.exception('Trace: ' + str(notExistErr) + '\n')
            return json.dumps(errors['DoesNotExist'])

        except Exception as genericErr:
            logger.exception('******** Erro ao atualizar a notícia, id: ' + str(id) + str(req))
            logger.exception('Trace: ' + str(genericErr) + '\n')
            return json.dumps(errors['InternalServerError'])

