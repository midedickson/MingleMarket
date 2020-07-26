import React, { Fragment } from "react";
import Login from "./Login";
import ConfettiAni from "./Confetti";
import Playboy from "../assets/background-video.mp4";

class Footer extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
        <span className="navbar-brand" href="#">
          Active Users:
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <div className="nav-item active_users_count btn btn-danger">
                <span className="text-dark">123345</span>
              </div>
            </li>
            <li className="nav-item">
              <div className="active_img_cont">
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                  className="rounded-circle active_user_img"
                />
                <span className="active_online_icon"></span>
              </div>
            </li>
            <li className="nav-item">
              <div className="active_img_cont">
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                  className="rounded-circle active_user_img"
                />
                <span className="active_online_icon"></span>
              </div>
            </li>
            <li className="nav-item">
              <div className="active_img_cont">
                <img
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                  className="rounded-circle active_user_img"
                />
                <span className="active_online_icon"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Footer;
