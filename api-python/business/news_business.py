import datetime, time
from business.news_validation import NewsValidation
from dao.news_dao import NewsDao
from resources.errors import *
import json


class NewsBusiness:

    """Classe responsável pela lógica de negócio das notícias. Executa validações,
        filtros e operações necessárias antes de enviar para a sua DAO, que irá
        operar com banco de dados"""

    validation = NewsValidation()
    dao = NewsDao()

    # ----------------------------------------------------------------

    def create_news(self, news_json):
        now_date = datetime.datetime.now()
        timestamp = int(time.mktime(now_date.timetuple())) * 1000
        news_json['publishingDate'] = timestamp

        if self.validation.validate_fields(news_json):
            return self.dao.create_news(news_json)
        else:
            return json.dumps(errors['SchemaValidationError'])

    # ----------------------------------------------------------------

    def get_all_news(self):
        return self.dao.get_all_news()

    # ----------------------------------------------------------------

    def get_news(self, id):
        return self.dao.get_news(id)

    # ----------------------------------------------------------------

    def delete_news(self, id):
        return self.dao.delete_news(id)

    # ----------------------------------------------------------------

    def update_news(self, id, news_json):
        if self.validation.validate_fields(news_json):
            return self.dao.update_news(id, news_json)
        else:
            return json.dumps(errors['SchemaValidationError'])

    # ---------------------------------------------------------------

