import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
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
            <span className="text-danger">MINGLE MARKET CHAT ROOM</span>
          </div>
        </div>
        <span id="action_menu_btn">
          <i class="fas fa-smile-beam"></i>
        </span>
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
