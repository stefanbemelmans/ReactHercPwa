import React, { Component } from "react";
import './App.css';
import{ EdgeLoginPage } from "./Pages/EdgeLoginPage"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div>
        <EdgeLoginPage />
      </div>
    )
  }
}

export default App;
