# Arquivo com diversas classes de erro, usados na Business e
# principalmente na DAO de cada entidade, de modo que os
# erros retornados sejam previsíveis e tratados de forma
# adequada na api e também como resposta para o sistema de
# da camada superior de consumo Restful.

class InternalServerError(Exception):
    pass


class SchemaValidationError(Exception):
    pass


class NewsAlreadyExistsError(Exception):
    pass


class CreatingNewsError(Exception):
    pass


class UpdatingNewsError(Exception):
    pass


class ReadingNewsError(Exception):
    pass


class DeletingNewsError(Exception):
    pass


class NewsNotExistsError(Exception):
    pass


class CreatingUserError(Exception):
    pass


class EmailAlreadyExistsError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500,
        "error": "InternalServerError"
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400,
        "error": "SchemaValidationError"
    },
    "DoesNotExist": {
        "message": "Request document does not exists",
        "status": 400,
        "error": "DoesNotExist"
    },
    "FieldDoesNotExist": {
        "message": "One or more fields does not exists",
        "status": 400,
        "error": "FieldDoesNotExist"
    },
    "SaveConditionError": {
        "message": "One or more fields does not could be saved",
        "status": 400,
        "error": "SaveConditionError"
    },
    "NewsAlreadyExistsError": {
        "message": "News with given title already exists",
        "status": 400,
        "error": "NewsAlreadyExistsError"
    },
    "CreatingNewsError": {
        "message": "Error on trying to read news",
        "status": 403,
        "error": "CreatingNewsError"
    },
    "ReadingNewsError": {
        "message": "Error on trying to read news",
        "status": 403,
        "error": "ReadingNewsError"
    },
    "UpdatingNewsError": {
        "message": "Updating news added by other is forbidden",
        "status": 403,
        "error": "UpdatingNewsError"
    },
    "DeletingNewsError": {
        "message": "Deleting news added by other is forbidden",
        "status": 403,
        "error": "DeletingNewsError"
    },
    "NewsNotExistsError": {
        "message": "News with given id doesn't exists",
        "status": 400,
        "error": "NewsNotExistsError"
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400,
        "error": "EmailAlreadyExistsError"
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401,
        "error": "UnauthorizedError"
    }
}
