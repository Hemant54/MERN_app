import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("../Dashboard")),
  },
  {
    path: "dashboard",
    component: asyncComponent(() => import("../Dashboard")),
  },
  {
    path: "addQuestion",
    component: asyncComponent(() => import("../AddQuestion")),
  },
  {
    path: "editQuestion",
    component: asyncComponent(() => import("../EditQuestion")),
  },
];

export default (props) => {
  const { url, style } = props;
  return (
    <Switch style={style}>
      {routes.map((singleRoute) => {
        const { path, exact, ...otherProps } = singleRoute;
        return (
          <Route
            exact={exact === false ? false : true}
            key={singleRoute.path}
            path={`${url}/${singleRoute.path}`}
            {...otherProps}
          />
        );
      })}
    </Switch>
  );
};
