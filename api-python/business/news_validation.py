from cerberus import Validator


class NewsValidation:
    """"Classe que faz a validação dos campos através do Cerberus.
        Usada na Business respectiva, como meio de filtrar as requisições
        do banco de dados ou outras operações"""

    validator = Validator()
    schema = {
        'publishingTitle': {'type': 'string', 'minlength': 3, 'maxlength': 200},
        'publishingContents': {'type': 'string', 'minlength': 5, 'maxlength': 2000},
        'publishingDate': {'type': 'integer', 'min': 1000}
    }

    def validate_fields(self, fields):
        return self.validator.validate(fields, self.schema)
