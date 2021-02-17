import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "resources/routes";
import { Scrollbars } from "react-custom-scrollbars";
import useThemeSwitcher from "hooks/useThemeSwitcher";
import Logo from "assets/images/globo-logo-1966.png";
import { getLocalAuthUserName } from 'resources/auth'
import { deleteAuth } from "app-redux/actions/authActions";


export const Navbar = () => {
    const ThemeSwitcher = useThemeSwitcher();

    const isNavbarVisible = useSelector((state) => state.layout.navbar);

    const authName = getLocalAuthUserName();

    const location = useLocation();

    const getNavLinkClass = (path) => {
        return location.pathname === path ? "active" : "";
    };
    
    const dispatch = useDispatch();

    const exitApp = (e) => {
        if(e.action === 'exit') {
            dispatch(deleteAuth());
        }
    }

    return (
        <nav id="sidebar" className={!isNavbarVisible ? "active" : ""}>
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <div className="sidebar-header">
                    <img src={Logo} className="sidebar-logo"
                        alt="Logo da Rede Globo, de 1966"
                        data-toggle="tooltip" data-placement="bottom" title="Logo da Rede Globo, de 1966"
                    />
                </div>

                <ul className="list-unstyled components">

                    {routes
                        .filter((route) => route.navbar !== "")
                        .map((route, index) => {
                            
                            return route.child ? (
                                <li key={index}>
                                    <a
                                        href={`#pageSubmenu${index}`}
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="dropdown-toggle"
                                        onClick={e => exitApp()}
                                    >
                                        {route.navbar}
                                    </a>
                                    <ul
                                        className="collapse list-unstyled"
                                        id={`pageSubmenu${index}`}
                                    >
                                        {route.child.map((child, idx) => {
                                            return (
                                                <li
                                                    key={idx}
                                                    className={getNavLinkClass(
                                                        child.path
                                                    )}
                                                >
                                                    <NavLink
                                                        to={child.path}
                                                        activeClassName="active"
                                                    >
                                                        {child.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ) : (
                                <li 
                                onClick={e => exitApp(route)}
                                    key={index}
                                    className={getNavLinkClass(route.path)}
                                >
                                    <Link to={route.path}>{route.navbar}</Link>
                                </li>
                            );
                        })}

                </ul>
                <ul className="list-unstyled components">
                    <center>Bem vindo <strong>{authName}</strong>!</center>
                    <li><center className="text-white">{ThemeSwitcher}</center></li>
                </ul>


            </Scrollbars>
        </nav>
    );
};
