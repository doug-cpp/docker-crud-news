import React, { Suspense } from "react";
import "components/FontawsomeIcons";

import "./App.css";
import "./dark.css";

import Layout from "pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "resources/routes";
import PageNotFound from "pages/PageNotFound";
import Home from "pages/Home";
import Signup from "pages/Signup";
import { getLocalToken } from 'resources/auth'



function App() {

    const authToken = getLocalToken();

    return (
        <>
            <Router>
                <Layout>
                    <Suspense fallback={<div>Carregando...</div>}>
                        {authToken && <Switch>
                            {routes.map((route) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={route.path}
                                />
                            ))}
                            <Route path='/start' exact>
                                <Home />
                            </Route>
                            <Route path='/' exact>
                                <Home />
                            </Route>
                            <Route>
                                <PageNotFound />
                            </Route>
                        </Switch>}
                        <Route>
                            {!authToken && <Signup />}
                        </Route>
                    </Suspense>
                </Layout>
            </Router>
        </>
    );
}

export default App;
