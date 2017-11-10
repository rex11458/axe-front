import React from "react"
import { render } from "react-dom"
import {Layout,Menu,Icon,Button} from 'antd'
import { BrowserRouter, Link, Route, Redirect, Switch } from "react-router-dom";
import {getNavData} from '../common/nav'
import { getRouteData } from "../utils/utils";
import Transform from '../routes/Trade/transform'
const styles = require('./BasicLayout.less')
const { Header , Sider , Content } = Layout
const {SubMenu} = Menu
const MenuItemGroup = Menu.ItemGroup
interface Props {
  dispatch:any
}
interface State {}

class BasicLayout extends React.Component<Props, State> {
  menus?: Array<any> 
  dispatch:any
  constructor(props, context) {
    super(props, context);
    this.dispatch = this.props.dispatch
    this.menus = getNavData().reduce(
    (arr, current) => arr.concat(current.children),
    []
  )
  }

  getNavMenuItems(menusData: Array<any>, parentPath: String = ""): Array<any> {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf("http") === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ""}`.replace(/\/+/g, "/");
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path}>
          {/^https?:\/\//.test(itemPath) ? (
            <a href={itemPath} target={item.target}>
              {icon}
              <span>{item.name}</span>
            </a>
          ) : (
            <Link to={itemPath} target={item.target}>
              {icon}
              <span>{item.name}</span>
            </Link>
          )}
        </Menu.Item>
      );
    });
  }

  public render(): JSX.Element {
    return <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={require("../assets/image/logo.png")} alt="logo" />
            </Link>
          </div>
          
            <Menu className={styles.navigation} mode="horizontal">
              <Menu.Item className={styles.subMenu} key="1">
                <Icon type="mail" />产品交易
              </Menu.Item>
              <Menu.Item className={styles.subMenu} key="2">
                <Icon type="appstore" />基金筛选
              </Menu.Item>
              <Menu.Item className={styles.subMenu} key="3">
                <Icon type="appstore" />基金对比
              </Menu.Item>
              <Menu.Item className={styles.subMenu} key="4">
                <Icon type="appstore" />基金回测
              </Menu.Item>
            </Menu>
          </Header>
        <Layout>
        <Sider className={styles.sider}>
          <Menu className={styles.menu} mode="inline">
            {this.getNavMenuItems(this.menus)}
          </Menu>
        </Sider>
          <Content className={styles.content} style={{ margin: "24px 24px 0", height: "100%" }}>
            {/* <img src="http://192.168.10.127:52500/axe/images/afloginbg.jpg" alt="bg" /> */}
            <Switch>
              {getRouteData("BasicLayout").map(item => (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              ))}
              <Redirect to="/Account/proopen" />
            </Switch>
          </Content>
        </Layout>
      </Layout>;
  }
}

export default BasicLayout
