import React from "react";

const NewsList = React.lazy(() => import("pages/NewsList"));
const StartPage = React.lazy(() => import("pages/StartPage"));
const Signup = React.lazy(() => import("pages/Signup"));

const routes = [
  {
    enabled: true,
    path: "/start",
    component: StartPage,
    navbar: "Home",
    child: null,
    action: null
  },
  {
    enabled: true,
    path: "/news-list",
    component: NewsList,
    navbar: "Notícias",
    child: null,
    action: null
  },
  {
    enabled: true,
    path: "/signup",
    component: Signup,
    navbar: "Sair",
    child: null,
    action: 'exit'
  },
];

export default routes.filter((route) => route.enabled);
