import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Chat from "./containers/Chat";

export default BaseRouter;
function BaseRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:chatID`} component={Chat} />
    </Switch>
  );
}
