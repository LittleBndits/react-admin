import React, { Component, Fragment } from 'react';

// icon
import { UserOutlined} from '@ant-design/icons';
// antd
import { Menu } from 'antd'
// router
import Router from '../../router/index'

const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(Router);
  }
  // 一级菜单
  renderMenu = ({ title, key }) => {
    return <Menu.Item key={key}>{title}</Menu.Item>

  }
  // 子级菜单
  renderSubMenu = ({ title, key, child }) => {
    return (
      <SubMenu key={key} icon={<UserOutlined />} title={title}>
        {
          child && child.map(subItem => {
            console.log("renderSubMenu -> subItem", subItem)
            return subItem.child && subItem.child.length > 0 ? this.renderSubMenu(subItem) : this.renderMenu(subItem)

          })
        }
      </SubMenu>
    )
  }
  render() {
    return (
      <Fragment>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: 'calc( 100% - 83px )', borderRight: 0, overflow: 'auto' }}
        >

          {
            Router && Router.map(firstItem => {
              console.log("AsideMenu -> render -> firstItem", firstItem)

              return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)

            })
          }
        </Menu>
      </Fragment>
    )
  }
}
export default AsideMenu;