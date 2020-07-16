import React, { Component, Fragment } from 'react';
// css
import './aside.scss'

// AsideMenu
import AsideMenu from '../../../compoents/asideMenu/'

class Aside extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <div className="logo">EP-admin</div>
        <AsideMenu />
      </Fragment>
    )
  }
}
export default Aside;