import * as React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';


const MenuItem = Menu.Item;


/**
 * 头部公共导航
 */
interface IHeaderRouterProps {
  title: string;
}

interface IHeaderProps extends RouteComponentProps<IHeaderRouterProps> {

};



class Header extends React.Component<IHeaderProps, {}> {
  
  public render(): JSX.Element {
    return (
      <div className="header-container">
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[this.props.location.pathname]}
        >
          <MenuItem key='/login'>
            <Link to="/login"><Icon type="bell" />登录</Link>
          </MenuItem>
          <MenuItem key="/register">
            <Link to="/register"><Icon type="usergroup-add" />注册</Link>
          </MenuItem>
          <MenuItem key="/user/">
            <Link to="/user"><Icon type="user" />用户</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}



export default withRouter(Header);