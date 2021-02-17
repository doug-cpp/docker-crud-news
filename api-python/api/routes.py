from api.news_api import NewsApi, NewsApiParam
from api.user_api import UserApi, AuthUserApi


def config_routes(api):
    """Configura as rotas para a api. No sistema atual, temos os endpoints:
        - news
        - user
        - user/auth
        Cada rota terá o prefixo /api/v[VERSION], onde
        v0 é a versão inicial da mesma. Novas versões
        da API terão esse valor incrementado visando manutenibilidade"""

    # Notícias
    api.add_resource(NewsApi, '/api/v0/news')
    api.add_resource(NewsApiParam, '/api/v0/news/<id>')

    # Usuários
    api.add_resource(UserApi, '/api/v0/user')
    api.add_resource(AuthUserApi, '/api/v0/user/auth')

