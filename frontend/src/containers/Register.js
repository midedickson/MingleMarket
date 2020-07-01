import React from "react";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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

    this.props.signup(
      e.target.username.value,
      e.target.email.value,
      e.target.password.value,
      e.target.password2.value
    );
  };

  render() {
    return (
      <div id="profile">
        <div className="wrap">
          {/*  */}
          {this.props.username !== null ? <p>{this.props.username}</p> : null}

          <div id="registration">
            <div className="container-fluid">
              <div className="row no-gutter">
                {/* <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div> */}
                <div className="col-md-8 col-lg-6">
                  <div className="login d-flex align-items-center py-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                          <h3 className="login-heading mb-4 text-danger">
                            Join Us!
                          </h3>
                          {this.props.loading ? (
                            <Spin indicator={antIcon} />
                          ) : this.props.isAuthenticated ? (
                            <Link to="/profile">
                              <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2">
                                <span>Set up Your Profile</span>
                              </button>
                            </Link>
                          ) : (
                            <form method="POST" onSubmit={this.authenticate}>
                              <div className="form-label-group">
                                <input
                                  type="username"
                                  name="username"
                                  id="inputUsername"
                                  className="form-control"
                                  placeholder="Username"
                                  required
                                  autoFocus
                                />
                                <label htmlFor="inputUsername">Username</label>
                              </div>
                              <div className="form-label-group">
                                <input
                                  type="email"
                                  name="email"
                                  id="inputEmail"
                                  className="form-control"
                                  placeholder="Email"
                                  required
                                  autoFocus
                                />
                                <label htmlFor="inputEmail">Email</label>
                              </div>

                              <div className="form-label-group">
                                <input
                                  type="password"
                                  name="password"
                                  id="inputPassword"
                                  className="form-control"
                                  placeholder="Enter Password"
                                  required
                                />
                                <label htmlFor="inputPassword">
                                  Enter Password
                                </label>
                              </div>
                              <div className="form-label-group">
                                <input
                                  type="password"
                                  name="password2"
                                  id="inputPassword2"
                                  className="form-control"
                                  placeholder="Confirm Password"
                                  required
                                />
                                <label htmlFor="inputPassword2">
                                  Confirm Password
                                </label>
                              </div>

                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck1"
                                >
                                  Remember password
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                                  type="submit"
                                >
                                  Sign Up
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
