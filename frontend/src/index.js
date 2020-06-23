import ReactDOM from "react-dom";
import Chat from "./containers/Chat";
import React, { Component } from "react";
import WebSocketInstance from "./websocket";

export class App extends Component {
  componentDidMount() {
    WebSocketInstance.connect();
  }
  render() {
    return <Chat />;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
