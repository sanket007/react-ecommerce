import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Checkout from "./pages/checkout/checkout.component";
import { connect } from "react-redux";
import { checkUserIsAuthenticated } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  componentDidMount() {
    const { checkCurrentUser } = this.props;
    checkCurrentUser();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkCurrentUser: () => dispatch(checkUserIsAuthenticated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
