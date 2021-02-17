from resources.database import db


class NewsModel(db.Document):
    """Classe que define o tipo de dado de cada campo. Desta forma, a api registra
        e retorna informações consistentes com os tipos esperados pelo banco e também
        pela interface do usuário"""

    publishingTitle = db.StringField(min_length=3, max_length=200, required=True)
    publishingContents = db.StringField(min_length=5, max_length=2000, required=True)
    publishingDate = db.IntField(min=1000)  # Irá gravar um timestamp legível por javascript
