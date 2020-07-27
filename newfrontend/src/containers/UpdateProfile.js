import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../store/actions/auth";

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_photo: null,
      first_name: props.profile.first_name,
      last_name: props.profile.last_name,
      phone_number: props.profile.phone_number,
      bio: props.profile.bio,
      catch_phrase: props.profile.catch_phrase,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  fileChange(event) {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  }

  updateUserProfile = (e) => {
    console.log(this.state);
    e.preventDefault();

    this.props.updateProfile(
      this.props.user,
      this.state.profile_photo,
      this.state.first_name,
      this.state.last_name,
      this.state.phone_number,
      this.state.bio,
      this.state.catch_phrase,
      this.props.token
    );
  };

  render() {
    const state = this.state;
    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container bootstrap snippet">
        <div className="row">
          <div className="col-sm-10">
            <h1>{this.props.user}</h1>
          </div>
          <div className="col-sm-2"></div>
        </div>
        <form
          className="form"
          method="put"
          id="registrationForm"
          onSubmit={this.updateUserProfile}
          enctype="multipart/form-data"
        >
          <div className="row">
            <div className="form-group col-sm-3">
              <div className="text-center">
                <label htmlFor="profile_photo">
                  <h4>Display Picture</h4>
                </label>
                <img
                  src={this.props.profile.photo}
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input
                  name="profile_photo"
                  type="file"
                  id="profile_photo"
                  onChange={this.fileChange}
                  className="text-center center-block file-upload"
                />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="first_name">
                    <h4>First name</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    value={state.first_name}
                    onChange={this.handleChange}
                    title="enter your first name if any."
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="last_name">
                    <h4>Last name</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    value={state.last_name}
                    onChange={this.handleChange}
                    title="enter your last name if any."
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="phone">
                    <h4>Phone</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    id="phone"
                    value={state.phone_number}
                    onChange={this.handleChange}
                    title="enter your phone number if any."
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="mobile">
                    <h4>Bio</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bio"
                    id="bio"
                    value={state.bio}
                    onChange={this.handleChange}
                    title="Enter a short description of yourself"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="mobile">
                    <h4>Catch Phrase</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="catch_phrase"
                    id="catch_phrase"
                    value={state.catch_phrase}
                    onChange={this.handleChange}
                    title="Enter a short description of yourself"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <button className="btn btn-lg btn-success" type="submit">
                    <i className="glyphicon glyphicon-ok-sign"></i> Save
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (
      user,
      photo,
      first_name,
      last_name,
      phone_number,
      bio,
      catch_phrase,
      token
    ) =>
      dispatch(
        authActions.updateUserProfile(
          user,
          photo,
          first_name,
          last_name,
          phone_number,
          bio,
          catch_phrase,
          token
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
