import React, { Fragment } from "react";
import axios from "axios";
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
import BackgroundChanger from "./containers/Background";
import UpdateProfile from "./containers/UpdateProfile";
import Support from "./containers/SupportCenter";
import "./App.css";
import ConfettiAni from "./containers/Confetti";
import SkyConfetti from "./containers/Sky";
import Footer from "./containers/OnlineVisitors";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startConfetti: false,
      confettiType: null,
      bgColor: "transparent",
      showEmojiPicker: false,
    };
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
    this.toggleConfetti = this.toggleConfetti.bind(this);
    this.toggleBackground = this.toggleBackground.bind(this);
  }
  waitForAuthDetails() {
    const component = this;
    setTimeout(() => {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getProfile(component.props.token);
      } else {
        console.log("waiting for auth details");

        component.waitForAuthDetails();
      }
    }, 100);
  }

  baseUrl = "https://mingle-market.herokuapp.com/api/chat/animation/";
  headers = {
    "Content-Type": "application/json",
  };

  componentDidMount() {
    this.waitForAuthDetails();
    this.inter = setInterval(() => {
      axios
        .get(this.baseUrl, {
          headers: this.headers,
        })
        .then((res) => {
          this.setState({
            startConfetti: res.data.startConfetti === "on",
            confettiType: res.data.confettiType,
            bgColor: res.data.bgColor,
          });
        })
        .catch((err) => console.log(err));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  toggleConfetti(confettiType, checked) {
    axios
      .put(
        this.baseUrl,
        {
          startConfetti: checked ? "on" : "off",
          confettiType,
        },
        { headers: this.headers }
      )
      .then((res) => {
        this.setState((oldState) => ({
          startConfetti: checked,
          confettiType,
          ...oldState,
        }));
      })
      .catch(() => {
        this.setState((oldState) => ({
          ...oldState,
        }));
      });
  }

  toggleBackground(color) {
    axios
      .put(
        this.baseUrl,
        {
          startConfetti: this.state.startConfetti ? "on" : "off",
          confettiType: this.state.confettiType,
          bgColor: color,
        },
        { headers: this.headers }
      )
      .then((res) => {
        this.setState({
          bgColor: color,
        });
      });
  }

  render() {
    const { showEmojiPicker } = this.state;
    return (
      <Router>
        <Navbar
          toggleConfetti={this.toggleConfetti}
          toggleBackground={this.toggleBackground}
          confettiType={this.state.confettiType}
          start={this.state.startConfetti}
          currentBg={this.state.bgColor}
        />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/rules-and-support">
            <Support />
          </Route>
          <Route path="/chat">
            <BackgroundChanger color={this.state.bgColor}>
              <ConfettiAni
                start={this.state.startConfetti}
                type={this.state.confettiType}
              />
              <SkyConfetti
                start={this.state.startConfetti}
                type={this.state.confettiType}
              />
              <div className="container-fluid row chat">
                <Sidepanel />
                <div className="col-md-8 col-xl-9">
                  <div className="card">
                    <AddChatModal
                      isVisible={this.props.showAddChatPopup}
                      close={this.props.closeAddChatPopup}
                    />
                    <BaseRouter />
                  </div>
                </div>
                <Footer />
              </div>
            </BackgroundChanger>
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/update-profile">
            <UpdateProfile />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.token,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    getProfile: (token) => dispatch(authActions.getUserProfile(token)),
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    addMessage: (message) => dispatch(msgActions.addMessage(message)),
    setMessages: (messages) => dispatch(msgActions.setMessages(messages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
