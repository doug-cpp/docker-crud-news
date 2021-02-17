import React from "react";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import StartPage from "./StartPage";

import { getLocalToken } from 'resources/auth'


const Home = ({ children }) => {
    const isNavbarVisible = useSelector((state) => state.layout.navbar);

    const authToken = getLocalToken();

    return (
        <>
            <div className="wrapper">
                {authToken && <Navbar />}
                <div id="content" className={!isNavbarVisible ? "active" : ""}>
                    {!children ? <StartPage /> : children}
                </div>
            </div>
            
            <div className="news-footer">
                Apresentação de um CRUD de Notícias feito em React, com API Restful
                em Python e MongoDB - Douglas Azevedo - 15/02/2021
            </div>
        </>
    );
};

export default withRouter(Home);
