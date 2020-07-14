import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// 引用组件
import Login from "./views/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact component={Login} path="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
