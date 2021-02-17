from flask import request, Response
from flask_restful import Resource
from resources.errors import *
from business.user_business import UserBusiness


class UserApi(Resource):
    """Classe das operação Restful POST sem parâmetro da API de Usuário,
        que cadastra um usuário para sua posterior autenticação.
        Cada usuário deverá ter uma chave ID única, além de um
        email também único no sistema"""

    business = UserBusiness()

    def post(self):
        user_json = request.get_json();
        return Response(self.business.create_user(user_json),
                        mimetype='application/json',
                        status=200)

class AuthUserApi(Resource):
    """Classe das operação Restful POST com a busca de um usuário
        previamente cadastrado, para que possa ter email e senha
        validados para a garantia do token de autenticação"""

    business = UserBusiness()

    def post(self):
            user_json = request.get_json();
            resp = self.business.sign_in(user_json);
            return Response(resp,
                            mimetype='application/json',
                            status=200)
