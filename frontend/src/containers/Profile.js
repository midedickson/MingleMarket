import React from "react";
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
      console.log("null token");
    }
    return (
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src="http://emilcarlsson.se/assets/harveyspecter.png"
              alt=""
              className="rounded-circle user_img"
            />
            <span className="online_icon"></span>
          </div>
          <div className="user_info">
            <span>{this.props.username}</span>
            <p>1767 Messages</p>
          </div>
          <div className="video_cam">
            <span>
              <i className="fas fa-video"></i>
            </span>
            <span>
              <i className="fas fa-phone"></i>
            </span>
          </div>
        </div>
        <span id="action_menu_btn">
          <i className="fas fa-ellipsis-v"></i>
        </span>
        <div className="action_menu">
          <ul>
            <li>
              <i className="fas fa-user-circle"></i> View profile
            </li>
            <li>
              <i className="fas fa-plus"></i> Add to group
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Profile);
