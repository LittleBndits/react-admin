import React, { Component } from 'react';
// layou CSS
import './layout.scss'
// layout 组件
import Aside from './compoents/aside'
// antd
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Layout className='layout-wrap'>
        <Sider width={250}><Aside /></Sider>
        <Layout>
          <Header className="layout-header">tabs</Header>
          <Content className="layout-main">内容</Content>
        </Layout>
      </Layout>
    )
  }
}
export default Index;