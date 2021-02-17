from flask_restful import Resource
from flask import Response, request
from flask_jwt_extended import jwt_required
from business.news_business import NewsBusiness


class NewsApi(Resource):
    """Classe das operações Restful sem parâmetro da API de Notícias,
        que expõe as operações Restful de forma genérica, para ser
        consumida por qualquer sistema que seja compatível e autenticado"""

    news_business = NewsBusiness()

    @jwt_required
    def get(self):
        return Response(self.news_business.get_all_news(),
                        mimetype='application/json',
                        status=200)

    @jwt_required
    def post(self):
        news_json = request.get_json();
        return Response(self.news_business.create_news(news_json),
                        mimetype='application/json',
                        status=200)


class NewsApiParam(Resource):
    """Classe das operações Restful com parâmetro da API de Notícias,
        que expõe as operações Restful de forma genérica, para ser
        consumida por qualquer sistema que seja compatível e autenticado"""

    news_business = NewsBusiness()

    @jwt_required
    def put(self, id):
        news_json = request.get_json();
        return Response(self.news_business.update_news(id, news_json),
                        mimetype='application/json',
                        status=200)

    @jwt_required
    def get(self, id):
        return Response(self.news_business.get_news(id),
                        mimetype='application/json',
                        status=200)

    @jwt_required
    def delete(self, id):
        return Response(self.news_business.delete_news(id),
                        mimetype='application/json',
                        status=200)
