import * as React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { History } from '../../../node_modules/@types/history';

import './UserTable.less';




export interface IUserTableProps {
  userlist: object[];
  onDelete: any;
  onChange: any;
  history: History;
  total: number;      // 数据总数
};
interface IUserTableState {
  loading: boolean;
  current: number;    // 当前页码
  pageSize: number;   // 每页展示数据数目
};


/**
 * 用户信息表格
 */
class UserTable extends React.Component<IUserTableProps, IUserTableState> {

  public readonly state = {
    loading: false,
    current: 1,
    pageSize: 5,
  };

  public componentWillMount() {
    this.setState({ loading: true });
  }

  public componentDidMount() {
    this.props.userlist && this.setState({ loading: false });
  }

  public handleDelete: React.MouseEventHandler = (id): void => {
    this.props.onDelete(id);
  }

  // 处理分页
  public handleChange = (page: number, pageSize: number): void => {
    this.setState({ current: page, pageSize });
    this.props.history.push(`/user/?page=${page}&pageSize=${pageSize}`);
    this.props.onChange({
      page,
      pageSize,
    });
  }

  public render(): JSX.Element {
    const columns = [{
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Gender',
      dataIndex: 'usergender',
      key: 'usergender',
    }, {
      title: 'Email',
      dataIndex: 'useremail',
      key: 'useremail',
    }, {
      title: 'Address',
      dataIndex: 'useraddress',
      key: 'useraddress',
    }, {
      title: 'Job',
      dataIndex: 'userjob',
      key: 'userjob'
    }, {
      title: 'Actions',
      key: '_id',
      name: '_id',
      dataIndex: '_id',
      render: (text: string, record: any) => (
        <Popconfirm
          title="Are you sure to delete it?"
          onConfirm={this.handleDelete.bind(null, record._id)}
        >
          <Button
            type="danger"
            size="small"
          >Delete</Button>
        </Popconfirm>
      ),
    }];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.userlist}
          title={() => this.props.children}
          rowKey="_id"
          loading={this.state.loading}
          pagination={{
            className: 'user-table-pagination',
            total: this.props.total,
            pageSize: 5,
            onChange: (current: number, pageSize: number) => {
              this.handleChange(current, pageSize);
            }
          }}
        />
      </div>
    );
  }
}



export default UserTable;