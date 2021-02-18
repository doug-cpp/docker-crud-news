## Descrição

Este é um CRUD de Notícias feito com React/Redux, que utiliza uma API independente, que neste caso foi desenvolvida em *Python*, com armazenamento de dados em formato de documentos *NoSQL*.

## Instalação

Para que seja facilitado o processo, foram usadas tecnologias de container *Docker*, de modo que o processo todo seja possível com um único comando.

Utilize um terminal e vá para a raiz deste projeto, digitando o comando:

    <code>docker-compose -f docker-compose-prod.yml up --build</code>

Este comando, usará a versão de produção para executar o sistema. Caso deseje executar a versão de desenvolvimento, o simples comando abaixo fará este papel:

    <code>docker-compose up --build</code>

Feito isso, basta acessar o link http://0.0.0.0:3000 e utilizar o aplicativo.