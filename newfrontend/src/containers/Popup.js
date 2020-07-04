import React from "react";
import { Modal } from "antd";
import AddChatForm from "./Form";
class AddChatModal extends React.Component {
  render() {
    return (
      <Modal
        centered
        footer={null}
        visible={this.props.isVisible}
        onCancel={this.props.close}
      >
        <AddChatForm />
      </Modal>
    );
  }
}

export default AddChatModal;
