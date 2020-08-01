import React from "react";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as msgActions from "../store/actions/message";
import Contact from "../components/Contact";
import { Redirect } from "react-router-dom";

class Sidepanel extends React.Component {
  waitForAuthDetails() {
    const component = this;
    setTimeout(() => {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
      } else {
        console.log("waiting for auth details");
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    const activeChats = this.props.chats.map((c) => {
      return (
        <Contact
          key={c.id}
          name={`${c.name}`}
          status="online"
          // picURL="http://emilcarlsson.se/assets/louislitt.png"
          chatURL={`/${c.id}`}
        />
      );
    });
    return (
      <div className="col-md-4 col-xl-3">
        <div className="card mb-sm-3 mb-md-0 contacts_card">
          <div className="card-header">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search..."
                name=""
                className="form-control search"
              />
              <div className="input-group-prepend">
                <span className="input-group-text search_btn">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="card-body contacts_body">
            <ul className="contacts">{activeChats}</ul>
          </div>
          <div id="card-footer">
            <button
              className="d-flex justify-content-start btn-sm btn-danger"
              onClick={() => this.openAddChatPopup()}
            >
              <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
              <span>Add Chat</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (content) => dispatch(navActions.showAlert(content)),
    logout: () => dispatch(authActions.logout()),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(msgActions.getUserChats(username, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
