import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

function Contact(props) {
  let { url } = useRouteMatch();

  return (
    <NavLink to={`${url}${props.chatURL}`} style={{ color: "#fff" }}>
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

export default Contact;
