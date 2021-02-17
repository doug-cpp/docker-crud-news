from resources.database import db
from flask_bcrypt import generate_password_hash, check_password_hash


class UserModel(db.Document):
    """Classe que define o tipo de dado de cada campo. Desta forma, a api registra
        e retorna informações consistentes com os tipos esperados pelo banco e também
        pela interface do usuário"""

    email = db.EmailField(required=True, unique=True, min_length=8, max_length=50)
    name = db.StringField(required=True, min_length=2, max_length=50)
    password = db.StringField(required=True, min_length=8)

    # Gera um hashing para o armazenamento ilegível
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    # Faz a comparação do input do usuário com o que foi armazenado
    def check_password(self, password):
        return check_password_hash(self.password, password)
