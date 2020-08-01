import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import * as navActions from "../store/actions/nav";

function Contact(props) {
  let { url } = useRouteMatch();
  return (
    <NavLink
      to={`${url}${props.chatURL}`}
      style={{ color: "#fff" }}
      onClick={() => props.showAlert(props.name)}
    >
      <li className="active">
        <div className="d-flex bd-highlight">
          {/* <div className="img_cont">
            <img
              src={props.picURL}
              alt={props.name}
              className="rounded-circle user_img"
            />
            <span className={`${props.status}_icon`}></span>
          </div> */}
          <div className="user_info">
            <span>{props.name}</span>
            {/* <p>Kalid is online</p> */}
          </div>
        </div>
      </li>
    </NavLink>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (content) => dispatch(navActions.showAlert(content)),
  };
};
export default connect(null, mapDispatchToProps)(Contact);
