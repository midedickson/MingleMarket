import React from "react";
import { Form, Button, Select } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";

class AddChatForm extends React.Component {
  state = {
    usernames: [],
    error: null,
  };

  handleChange = (value) => {
    this.setState({
      usernames: value,
    });
  };

  handleFinish = (values) => {
    const { usernames } = this.state;
    const combinedUsers = [...usernames, this.props.username];

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .post("http://127.0.0.1:8000/chat/create/", {
        messages: [],
        participants: combinedUsers,
      })
      .then((res) => {
        this.props.history.push(`/${res.data.id}`);
        this.props.closeAddChatPopup();
        this.props.getUserChats(this.props.username, this.props.token);
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          error: err,
        });
      });
  };
  render() {
    return (
      <Form
        layout="inline"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input the username of whom you want to chat with",
          },
        ]}
        onFinish={this.handleFinish}
      >
        {this.state.error ? `${this.state.error}` : null}
        <Form.Item>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={this.handleChange}
          >
            {[]}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // disabled={hasErrors(getFieldsError())}
          >
            Start a chat
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddChatForm)
);
