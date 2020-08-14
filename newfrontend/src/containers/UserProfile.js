import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../store/actions/auth";

class UserProfile extends React.Component {
  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container portfolio">
          <div className="row">
            <div className="col-md-12">
              <div className="heading">
                <img
                  src="https://image.ibb.co/cbCMvA/logo.png"
                  alt="user_image"
                />
              </div>
            </div>
          </div>
          <div className="bio-info">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div className="bio-image">
                      <img
                        src={this.props.profile.photo}
                        alt="user_profile_image"
                        width="500"
                        height="500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bio-content">
                  <h1>
                    Hi there, I'm{" "}
                    {this.props.username[0].toUpperCase() +
                      this.props.username.slice(1)}
                  </h1>
                  <h6>{this.props.profile.bio}</h6>
                  <hr />
                  <span>{this.props.profile.phone_number}</span>
                  <p>{this.props.profile.catch_phrase}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    profile: state.auth.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (token) => dispatch(authActions.getUserProfile(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
