import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import Hoc from "../hoc/hoc";

class Chat extends React.Component {
  state = { message: "" };
  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatID);
  }
  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (this.props.match.params.chatID !== newProps.match.params.chatID) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.chatID
        );
      });
      WebSocketInstance.connect(newProps.match.params.chatID);
    }
  }
  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: "",
    });
  };

  renderTimestamp = (timestamp) => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = (messages) => {
    const currentUser = this.props.username;
    return messages.map((message, i, arr) => (
      <div
        key={message.id}
        className={
          message.author === currentUser
            ? "d-flex justify-content-end mb-4"
            : "d-flex justify-content-start mb-4"
        }
      >
        <div className="img_cont_msg">
          <img
            src="http://emilcarlsson.se/assets/mikeross.png"
            className="rounded-circle user_img_msg"
            alt="user"
          />
        </div>
        <div className="msg_cotainer">
          {message.author}
          <br />
          {message.content}
          <span className="msg_time">
            {this.renderTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    ));
  };
  /*
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }*/

  // componentDidUpdate(newProps) {
  //   console.log(newProps);
  //   if (this.props.match.params.chatID !== newProps.match.params.chatID) {
  //     WebSocketInstance.disconnect();
  //     this.waitForSocketConnection(() => {
  //       WebSocketInstance.fetchMessages(
  //         this.props.username,
  //         newProps.match.params.chatID
  //       );
  //     });
  //     WebSocketInstance.connect(newProps.match.params.chatID);
  //   }
  // }

  render() {
    return (
      <Hoc>
        <div className="card-body msg_card_body">
          {this.props.messages && this.renderMessages(this.props.messages)}
        </div>
        <div className="card-footer">
          <form onSubmit={this.sendMessageHandler}>
            <div className="input-group">
              <div className="input-group-append">
                <span className="input-group-text attach_btn">
                  <i className="fas fa-paperclip"></i>
                </span>
              </div>
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                className="form-control type_msg"
                id="chat-message-input"
                type="text"
                placeholder="Type your message..."
              />
              <div id="chat-message-submit" className="input-group-append">
                <span className="input-group-text send_btn">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
      </Hoc>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    messages: state.message.messages,
  };
};

export default connect(mapStateToProps)(Chat);
