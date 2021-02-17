import React, { useState, useEffect } from "react";
import Header from "components/Header";
import AddNews from "components/AddNews";
import { useDispatch } from "react-redux";
import NewsCard from "components/NewsCard";
import { fetchNews } from 'app-redux/actions/newsActions'

import { useSelector } from "react-redux";

const NewsList = () => {
    
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchNews());
    });

    const allNews = useSelector(state => state.newsList.list);

    const [newsFormVisiblity, setNewsFormVisiblity] = useState(false);

    const toggleNewsFormVisiblity = () =>
        setNewsFormVisiblity(visiblity => !visiblity);

    return (
        <>
            <Header title="CRUD de Notícias" />

            <div className="row">
                <div className="col-sm-12 text-center">
                    <p>
                        Executa operações CRUD em um redux store.
                    </p>

                    <div className="card">
                        <div className="card-header bg-dark text-white text-left">
                            <h4 className="d-inline float-right">Lista de notícias ({allNews.length})</h4>
                            <span title="Adicionar uma notícia"
                                className="float-left mt-1 cursor-pointer"
                                onClick={toggleNewsFormVisiblity}
                            >
                                <i className="fas fa-plus"></i>
                            </span>
                        </div>
                        <ul className="list-group list-group-flush">
                            {allNews.map((news, index) => (
                                <NewsCard
                                    {...news}
                                    _id={news._id['$oid']}
                                    key={index}
                                />
                            ))}
                        </ul>
                    </div>
                    {newsFormVisiblity && (
                        <AddNews onClose={toggleNewsFormVisiblity} />
                    )}
                </div>
            </div>
        </>
    );
};

export default NewsList;
