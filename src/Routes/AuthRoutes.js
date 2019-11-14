import { WalletPage } from "../Pages/WalletPage"
import { AccountPage } from "../Pages/AccountPage"


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const AuthRoutes = () => {
let { path, url } = useRouteMatch();

return (
    <div>
        <h3>Auth Routes</h3>
        <ul>
        <li>
          <Link to={`${url}/wallet`}>wallet</Link>
        </li>
        <li>
          <Link to={`${url}/account`}>account</Link>
        </li>
        <li>
          {/* <Link to={`${url}/home`}>home</Link> */}
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/wallet`}>
          <WalletPage />
        </Route>
        <Route path={`${path}/account`}>
          <AccountPage />
        </Route>
      </Switch>


    </div>
)

}

export default AuthRoutes