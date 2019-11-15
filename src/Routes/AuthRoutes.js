import React, { Component } from "react"
import { connect } from "react-redux"
import WalletPage from "../Pages/WalletPage"
import AccountPage from "../Pages/AccountPage"
import HomePage from "../Pages/HomePage"
import LoginPage from "../Pages/LoginPage"

import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

const PrivateRoute = ({component: protectedComponent, ...rest}) => {
   console.log({ ...rest }, "inPrivateRoute")
   let location = {...rest}
   if(location.loggedIn === false)
   {
     console.log(location.loggedIn, "should go to root") 
     return(
     <Route exact path="/" />
     )
   }
  if (location.loggedIn === true) {
    console.log(location.loggedIn, "loggedIN, should go to" + location.pathname)
    return (
      
      <Route exact
        path={location.pathname}
        component={protectedComponent}
      />
    )
  }
 
}

class AuthRoutes extends Component {
  render() {
    return (

      <Switch>
        <Route exact path="/">
          <a href="https://explorer.herc.one/" target="blank">link to explorer</a>
        </Route>

        <Route exact path="/login" component={LoginPage} />

        <PrivateRoute loggedIn={this.props.loggedIn} path="/wallet" component={WalletPage}  />

        <Route exact path="/account" component={AccountPage} />

        <Route exact path="/home" component={HomePage} />


      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {

    loggedIn: state.loggedIn
  }
}



export default withRouter(connect(mapStateToProps, null)(AuthRoutes))