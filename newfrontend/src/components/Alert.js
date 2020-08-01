import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import navActions from "../../src/store/actions/nav";
class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { alertContent, alert } = this.props;
    if (alertContent !== prevProps.alertContent) {
      this.props.alert.show(alertContent);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => {
  return {
    alertContent: state.nav.alert,
  };
};

export default connect(mapStateToProps, null)(withAlert()(Alerts));
