import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class UpdateProfile extends React.Component {
  render() {
    const profile = this.props.profile;
    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div class="container bootstrap snippet">
        <div class="row">
          <div class="col-sm-10">
            <h1>{this.props.user}</h1>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <form class="form" method="post" id="registrationForm">
          <div class="row">
            <div class="form-group col-sm-3">
              <div class="text-center">
                <label for="profile_photo">
                  <h4>Display Picture</h4>
                </label>
                <img
                  src={profile.photo}
                  class="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input
                  name="profile_photo"
                  type="file"
                  id="profile_photo"
                  class="text-center center-block file-upload"
                />
              </div>
            </div>
            <div class="col-sm-9">
              <div class="form-group">
                <div class="col-xs-6">
                  <label for="first_name">
                    <h4>First name</h4>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="first_name"
                    id="first_name"
                    placeholder={profile.first_name}
                    title="enter your first name if any."
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-6">
                  <label for="last_name">
                    <h4>Last name</h4>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="last_name"
                    id="last_name"
                    placeholder={profile.last_name}
                    title="enter your last name if any."
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-6">
                  <label for="phone">
                    <h4>Phone</h4>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    id="phone"
                    placeholder={profile.phone_number}
                    title="enter your phone number if any."
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-6">
                  <label for="mobile">
                    <h4>Bio</h4>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="bio"
                    id="bio"
                    placeholder={profile.bio}
                    title="Enter a short description of yourself"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-6">
                  <label for="mobile">
                    <h4>Catch Phrase</h4>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="catch_phrase"
                    id="catch_phrase"
                    placeholder={profile.catch_phrase}
                    title="Enter a short description of yourself"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-12">
                  <button class="btn btn-lg btn-success" type="submit">
                    <i class="glyphicon glyphicon-ok-sign"></i> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.username,
    profile: state.auth.profile,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(UpdateProfile);
