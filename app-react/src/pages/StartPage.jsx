import React, { useEffect } from "react";
import Header from "components/Header";
import { fetchNews } from 'app-redux/actions/newsActions'
import { useDispatch } from "react-redux";

const StartPage = () => {

    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(fetchNews());
    });

    return (
        <>
            <Header title="CRUD de Notícias" />

            <div>
                <p>Este é um teste proposto na entrevista do dia 08/02/2021 e concluído em 15/02/2021</p>
                <p>O aplicativo é um CRUD de notícias, usando React/Redux e uma api Python com Mongo DB.
                    A api é genérica e independente, exposta da seguinte maneira:</p>
                <ul>
                    <li><code>/news</code></li>
                    <li><code>/user</code></li>
                    <li><code>/user/auth</code></li>
                </ul>
                <p>Os <em>endpoints</em> são prefixados com a versão da api, para que possa ter uma manutenção mais
                    adequada, sendo <code>v[VERSION]</code>, onde a versão inicial é a <code>v0</code>. Temos então 
                     <code> HOST + REACT_APP_API_ENDPOINT + REACT_APP_API_VERSION</code>, ou
                     <code> http://127.0.0.1:5000/api/v0/user</code>, por exemplo, para uso neste app.
                </p>
                <p>A api está organizada da seguinte maneira:</p>
                <ul>
                    <li><code>business</code>&nbsp;&nbsp;&nbsp;[onde ficam as classes de negócio, com filtros, validações e tratamentos]</li>
                    <li><code>dao</code>&nbsp;&nbsp;&nbsp;[onde os documentos já filtrados tem acesso ao banco de dados]</li>
                    <li><code>api</code>&nbsp;&nbsp;&nbsp;[onde os métodos Restful terão a entrada no sistema]</li>
                    <li><code>resources</code>&nbsp;&nbsp;&nbsp;[arquivo de rotas e configurações]</li>
                    <li><code>model</code>&nbsp;&nbsp;&nbsp;[mapeamento dos documentos recebidos para a gravação adequada e validada]</li>
                    <li><code>log</code>&nbsp;&nbsp;&nbsp;[onde serão gravados arquivos de log por data, sempre que houver algum erro]</li>
                </ul>
                <p>A parte do frontend é completamente desacoplada, podendo usar qualquer api Restful
                    que seja compatível e autenticada. Todo acesso aos endpoints precisam de um cabeçalho de autenticação,
                    de modo que se um backend for desconectado, a aplicação não sairá da tela inicial de entrada.
                    Foram usados estilos de código React modernos, optando por
                    por componentes funcionais com código compatível com a última versão.</p>
                <p>A estrutura do frontend está organizada da seguinte maneira:</p>
                <ul>
                    <li><code>app-redux</code>&nbsp;&nbsp;&nbsp;[onde fica o objeto store, actions e reducers]</li>
                    <li><code>components</code>&nbsp;&nbsp;&nbsp;[onde ficam os componentes de uso geral da app]</li>
                    <li><code>hooks</code>&nbsp;&nbsp;&nbsp;[onde fica o loader, o alternador de tema e o validador de senha]</li>
                    <li><code>pages</code>&nbsp;&nbsp;&nbsp;[cada rota definida no arquivo "routes.txt" irá carregar uma página]</li>
                    <li><code>resources</code>&nbsp;&nbsp;&nbsp;[contem o arquivo de rotas e utilitários]</li>
                </ul>
                <p>A validação da aplicação e da api estão compatíveis e tratando a maior parte dos
                    erros de forma previsível.
                </p>
            </div>
        </>
    );
};

export default StartPage;
