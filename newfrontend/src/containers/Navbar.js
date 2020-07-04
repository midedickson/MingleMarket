import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import logo from "../assets/hey_mingle.png";

export class Header extends Component {
  render() {
    const guestLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <button className=" nav-link btn-sm btn-danger">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-outline-danger btn-sm text-dark"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand navbar-dark bg-light sticky-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="70" height="30" alt="" />
            </Link>
          </div>
          {this.props.isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  username: state.auth.username,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
