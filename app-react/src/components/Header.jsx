import React from "react";
import { useDispatch } from "react-redux";
import { deleteAuth } from "app-redux/actions/authActions";
import Logo from "assets/images/globo-logo-1966.png";

import { getLocalToken } from 'resources/auth'

const Header = ({ title = "Page Title" }) => {
    const dispatch = useDispatch();

    const logout = () => {
        window.location = '/start';
        return dispatch(deleteAuth());
    };

    const authToken = getLocalToken();

    return (
        <>
            <center className="logo-center-mobile">
                <img src={Logo} className="logo-center-mobile"
                    alt="Logo da Rede Globo, de 1966"
                    data-toggle="tooltip" data-placement="bottom" title="Logo da Rede Globo, de 1966"
                />
                <hr />
            </center>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" >
                    <h3>{title}</h3>
                    {authToken && <button
                        type="button"
                        id="sidebarCollapse"
                        className="btn btn-info"
                        onClick={logout}
                        alt="Sair do app"
                        data-toggle="tooltip" title="Sair do app" data-placement="bottom"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </button>}
                </div>
            </nav>
        </>
    );
};

export default Header;
