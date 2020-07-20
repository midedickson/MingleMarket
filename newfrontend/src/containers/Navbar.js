import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "antd";
import * as authActions from "../store/actions/auth";
import logo from "../assets/logo.png";
import Music from "../assets/Sunfire - Young Free And Single.mp3";
import AnimationDropdown from "../components/AnimationDropdown";
import BackgroundDropdown from "../components/BackgroundDropdown";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: true,
    };
  }


  onChange = () => {
    this.setState({ music: !this.state.music });
  };
  render() {
    const guestLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <button className="nav-link btn btn-outline-danger btn-sm text-dark">
              Register
            </button>
          </Link>
        </li>
        <li className="nav-item">
          {this.state.music === true ? (
            <audio autoPlay="autoplay" hidden="hidden">
              <source src={Music} type="audio/mpeg" />
            </audio>
          ) : (
            ""
          )}
        </li>
        <li className="nav-item">
          Music <Switch size="small" defaultChecked onChange={this.onChange} />
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle text-dark"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Hi, {this.props.username}
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
            <Link to="/profile" className="dropdown-item">
              My Profile
            </Link>

            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              Music{" "}
              <Switch size="small" defaultChecked onChange={this.onChange} />
            </div>
          </div>
        </li>
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle text-dark"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
           Animations
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
            <AnimationDropdown
              toggleConfetti={this.props.toggleConfetti}
              current={this.props.confettiType}
              start={this.props.start}
            />
          </div>
        </li>
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle text-dark"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
           Backgrounds
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
            <BackgroundDropdown
              color={this.props.bgColor}
              toggleBackground={this.props.toggleBackground}
              currentBg={this.props.currentBg}
            />
          </div>
        </li>
        <li className="nav-item">
          {this.state.music === "on" ? (
            <embed
              src={Music}
              autostart="true"
              loop={true}
              width="0"
              height="0"
            ></embed>
          ) : (
            ""
          )}
        </li>
        <li className="nav-item">
          <button
            onClick={(token) => this.props.logout(this.props.token)}
            className="nav-link btn btn-outline-danger btn-sm text-dark mx-2"
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
              <img src={logo} width="50" height="50" alt="" />
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
  token: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  logout: (token) => dispatch(authActions.logout(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
