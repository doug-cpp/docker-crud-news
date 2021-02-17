from logging.handlers import TimedRotatingFileHandler
from resources.constants import PATH_LOG, FILE_LOG

import logging
import os

# Configura os logs de erro do sistema. Este log é usado nas classes que
# monitoram e retornam erros previstos, como as classes Business e
# principalmente a DAO.

if not os.path.isdir(PATH_LOG):
    os.mkdir(PATH_LOG)

formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')
handler = TimedRotatingFileHandler(PATH_LOG + FILE_LOG, when="midnight", interval=1, encoding='utf8')
handler.suffix = "%Y-%m-%d"
handler.setFormatter(formatter)
logger = logging.getLogger('<NEWS_APP_INFO>')
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)
