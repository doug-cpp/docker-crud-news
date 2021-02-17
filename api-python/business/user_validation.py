from cerberus import Validator


class UserValidation:
    """"Classe que faz a validação dos campos através do Cerberus.
        Usada na Business respectiva, como meio de filtrar as requisições
        do banco de dados ou outras operações"""

    validator = Validator()
    schema = {
        'email': {'type': 'string', 'minlength': 8, 'maxlength': 50},
        'password': {'type': 'string', 'minlength': 8, 'maxlength': 20}
    }

    def validate_fields(self, fields):
        document = {'email': fields['email'], 'password': fields['password']}
        return self.validator.validate(document, self.schema)
