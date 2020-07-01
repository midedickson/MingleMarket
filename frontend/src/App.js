import React from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as authActions from "./store/actions/auth";
import * as navActions from "./store/actions/nav";
import * as msgActions from "./store/actions/message";
import BaseRouter from "./routes";
import Sidepanel from "./containers/Sidepanel";
import Profile from "./containers/Profile";
import WebSocketInstance from "./websocket";
import AddChatModal from "./containers/Popup";
import Homepage from "./containers/Homepage";
import Register from "./containers/Register";
import Navbar from "./containers/Navbar";
import UserProfile from "./containers/UserProfile";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className="container-fluid h-100">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/chat">
              <div className="container-fluid row justify-content-center">
                <Sidepanel />
                <div className="col-md-8 col-xl-6 chat">
                  <div className="card">
                    <AddChatModal
                      isVisible={this.props.showAddChatPopup}
                      close={this.props.closeAddChatPopup}
                    />
                    <Profile />
                    <BaseRouter />
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    addMessage: (message) => dispatch(msgActions.addMessage(message)),
    setMessages: (messages) => dispatch(msgActions.setMessages(messages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
