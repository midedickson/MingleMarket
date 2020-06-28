import React from "react";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class Login extends React.Component {
  state = {
    loginForm: true,
  };

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = (e) => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.email.value,
        e.target.password.value,
        e.target.password2.value
      );
    }
  };

  render() {
    return (
      <div id="profile">
        <div className="wrap">
          <img
            id="profile-img"
            src="http://emilcarlsson.se/assets/mikeross.png"
            className="online"
            alt=""
          />
          {this.props.username !== null ? <p>{this.props.username}</p> : null}
          <div id="status-options">
            <ul>
              <li id="status-online" className="active">
                <span className="status-circle"></span> <p>Online</p>
              </li>
              <li id="status-away">
                <span className="status-circle"></span> <p>Away</p>
              </li>
              <li id="status-busy">
                <span className="status-circle"></span> <p>Busy</p>
              </li>
              <li id="status-offline">
                <span className="status-circle"></span> <p>Offline</p>
              </li>
            </ul>
          </div>
          <div id="expanded">
            {this.props.loading ? (
              <Spin indicator={antIcon} />
            ) : this.props.isAuthenticated ? (
              <button onClick={() => this.props.logout()} className="authBtn">
                <span>Logout</span>
              </button>
            ) : (
              <div>
                <form method="POST" onSubmit={this.authenticate}>
                  <div>
                    <input name="username" type="text" placeholder="username" />
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                  <button type="submit">Authenticate</button>
                </form>

                <button onClick={this.changeForm}>Switch</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) =>
      dispatch(authActions.authLogin(userName, password)),
    logout: () => dispatch(authActions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(authActions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
