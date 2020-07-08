import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as authActions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class Login extends React.Component {
  authenticate = (e) => {
    e.preventDefault();
    this.props.login(e.target.username.value, e.target.password.value);
  };

  render() {
    return (
      <div id="profile">
        <div className="wrap">
          {/*  */}

          <div id="login">
            <div className="container-fluid">
              <div className="row no-gutter">
                {/* <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div> */}
                <div className="col-md-8 col-lg-6">
                  <div className="login d-flex align-items-center py-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                          <h2 className="login-heading mb-4 text-danger">
                            Welcome back!
                          </h2>
                          {this.props.loading ? (
                            <Spin indicator={antIcon} />
                          ) : this.props.isAuthenticated ? (
                            <div>
                              <Link to="/chat">
                                <button
                                  // onClick={() => this.props.logout()}
                                  className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                                >
                                  <span>Mingle</span>
                                </button>
                              </Link>
                              <Link to="/profile">
                                <button
                                  // onClick={() => this.props.logout()}
                                  className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                                >
                                  <span>Account Settings</span>
                                </button>
                              </Link>
                              <button
                                onClick={() => this.props.logout()}
                                className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                              >
                                <span>Logout</span>
                              </button>
                            </div>
                          ) : (
                            <form method="POST" onSubmit={this.authenticate}>
                              <div className="form-label-group">
                                <input
                                  type="username"
                                  name="username"
                                  id="inputEmail"
                                  className="form-control"
                                  placeholder="Username"
                                  required
                                  autoFocus
                                />
                                <label htmlFor="inputEmail">Username</label>
                              </div>

                              <div className="form-label-group">
                                <input
                                  type="password"
                                  name="password"
                                  id="inputPassword"
                                  className="form-control"
                                  placeholder="Password"
                                  required
                                />
                                <label htmlFor="inputPassword">Password</label>
                              </div>

                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="custom-control-label text-danger"
                                  htmlFor="customCheck1"
                                >
                                  Remember password
                                </label>
                              </div>
                              <button
                                className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                                type="submit"
                              >
                                Log in
                              </button>
                              <div className="text-center">
                                <a className="small" href="#">
                                  Forgot password?
                                </a>
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
