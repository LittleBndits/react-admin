import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
// 引用组件
import Home from "./views/Home";
import About from "./views/About";
import News from "./views/News";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="test">
        <h2>dfaf</h2>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route component={About} path="/About" />
            <Route component={News} path="/News" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
