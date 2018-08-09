import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './User.less';

import Header from '../../components/header/Header';
import UserDrawer from '../../components/UserDrawer/UserDrawer';
import { reduxHandleAddUser, reduxHandleInitUserList, reduxHandleRemoveUser } from '../../redux/user.redux';
import { Location, History } from '../../../node_modules/@types/history';
import { match } from '../../../node_modules/@types/react-router';
import UserTable from '../../components/UserTable/UserTable';
import { reduxHandleTestAuth } from '../../redux/admin.redux';





interface IUserProps {
  admin: { msg: string | undefined, isAuth: boolean, redirectTo: string | '' };
  user: { userlist: any[], total: number };
  reduxHandleInitUserList: any;
  reduxHandleAddUser: any;
  reduxHandleRemoveUser: any;
  reduxHandleTestAuth: any;
  loadData: any;
  location: Location;
  match: match<any>;
  history: History;
};
interface IUserState {
  visible: boolean;
};



class User extends React.Component<IUserProps, IUserState> {

  public readonly state = {
    visible: false,
  };

  public componentDidMount() {
    this.props.reduxHandleTestAuth();
    this.props.history.push(`/user/?page=${1}&pageSize=${5}`);
    this.props.reduxHandleInitUserList({
      page: 1,
      pageSize: 5,
    }); 
  }

  // 处理分页
  public handleChange = (pageinfo: { page: number, pageSize: number }): void => {
    this.props.reduxHandleInitUserList(pageinfo);
  }

  // ADD user
  public handleAddUser = (values: object): void => {
    this.props.reduxHandleAddUser(values);
  }

  // DELETE user
  public handleDeleteUser = (id: string): void => {
    this.props.reduxHandleRemoveUser(id);
  }

  // modal show or hide
  public handleToggle: React.MouseEventHandler = (): void => {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible,
      };
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Header />
        {
          this.props.admin.redirectTo
            ? (
              <div className="user-tip" style={{ lineHeight: '120px' }}>
                <h1>没有访问权限, 请<Link to={this.props.admin.redirectTo}>登录</Link>再试!</h1>
              </div>
            )
            : (
              <div className="user-container">
                {/* table  */}
                <div className="user-bottom-box">
                  <div className="bottom-content" style={{ paddingLeft: '70px' }}>
                    <UserTable 
                      userlist={this.props.user.userlist}
                      onDelete={this.handleDeleteUser}
                      onChange={this.handleChange}
                      history={this.props.history}
                      total={this.props.user.total}
                    >
                      <UserDrawer onAddUser={this.handleAddUser} />
                    </UserTable>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}


function mapStateToProps(state: { user: object, admin: object }): object {
  return {
    user: state.user,
    admin: state.admin,
  };
}
function mapDispatchToProps(): object {
  return {
    reduxHandleAddUser,
    reduxHandleInitUserList,
    reduxHandleRemoveUser,
    reduxHandleTestAuth,
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(User);