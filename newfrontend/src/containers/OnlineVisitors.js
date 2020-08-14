import React from "react";
import WebSocketInstance from "../websocket";
import { connect } from "react-redux";
class Footer extends React.Component {
  initialiseChat() {
    WebSocketInstance.getOnlineUsers();
  }
  constructor(props) {
    super(props);
    this.initialiseChat();
  }
  renderOnlineUsers = (users) => {
    return users.map((user, i, arr) => (
      <li className="nav-item">
        <div className="active_img_cont">
          <img
            src={user.contact_photo}
            alt={user.username}
            className="rounded-circle active_user_img"
          />
          <span className="active_online_icon"></span>
        </div>
      </li>
    ));
  };
  render() {
    // const online_users = this.renderOnlineUsers(this.props.users).length();
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
                <span className="text-dark"></span>
              </div>
            </li>
            {this.renderOnlineUsers(this.props.users)}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.message.online_users,
  };
};

export default connect(mapStateToProps)(Footer);
