import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const baseUrl = "https://mingle-market.herokuapp.com/";

export const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = (token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axios
    .post(baseUrl + "accounts/api/auth/logout/", null, {
      headers: headers,
    })
    .then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    });

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        baseUrl + "accounts/api/auth/login",
        {
          username: username,
          password: password,
        },
        { headers: headers }
      )
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        dispatch(authSuccess(username, token));
      })
      .catch((err) => {
        console.log(err.response);

        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(baseUrl + "accounts/api/auth/register", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        dispatch(authSuccess(username, token));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(username, token));
    }
  };
};

const getUserProfileSuccess = (profile) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile: profile,
  };
};

export const getUserProfile = (token) => {
  return (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(baseUrl + "chat/contact_detail/", { headers: headers })
      .then((res) => {
        dispatch(getUserProfileSuccess(res.data));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
