class WebSocketService {
  static instance = null;
  callbacks = {};
  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }
  constructor() {
    this.socketRef = null;
  }
  connect(chatURL) {
    const path = `ws://localhost:8000/ws/chat/${chatURL}/`;
    console.log(path)
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("websocket is open");
    };
    this.socketNewMessage(JSON.stringify({ command: "fetch_messages" }));
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = (e) => {
      console.log(e.mesage);
    };
    this.socketRef.onclose = () => {
      console.log("websocket is closed");
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username, chatId) {
    this.sendMessage({ command: "fetch_messages", username: username, chatId: chatId });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
    });
  }

  addCallbacks(messagesCallbacks, newMessageCallbacks) {
    this.callbacks["messages"] = messagesCallbacks;
    this.callbacks["new_message"] = newMessageCallbacks;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.mesasge);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log("Connection is secure");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("Waiting for connection....");
        recursion(callback);
      }
    }, 1);
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
