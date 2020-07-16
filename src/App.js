import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// 引用组件
import Login from "./views/Login/index";
import Index from "./views/index/index";

// 私有組件
import PrivateRouter from './compoents/privateRouter/index'

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
            <PrivateRouter  component={Index} path="/Index" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
