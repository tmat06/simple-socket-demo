import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import axios from "axios";
import Display from "./Display";

const socket = io.connect("http://localhost:3005");

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    socket.on("receive-me", messages => {
      this.setState({ messages: [...messages] });
    });
  }

  componentDidMount() {
    axios.get("/api/get-messages").then(response => {
      this.setState({ messages: [...response.data] });
    });
  }

  handleClick() {
    socket.emit("hit-me", {
      name: this.state.name,
      message: this.state.message
    });
  }

  render() {
    return (
      <div className="App">
        <input
          placeholder="name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          placeholder="chat box message"
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button onClick={() => this.handleClick()}>Send Message</button>
        {this.state.messages.map((val, i) => {
          return <Display name={val.name} message={val.message} />;
        })}
      </div>
    );
  }
}

export default App;
