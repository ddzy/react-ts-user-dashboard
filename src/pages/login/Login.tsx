import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../common.css';
import Header from '../../components/header/Header';
import { reduxHandleLogin } from '../../redux/admin.redux';
import { FormComponentProps } from '../../../node_modules/antd/lib/form';

const FormItem = Form.Item;




interface ILoginProps extends FormComponentProps {
  adminname: string;
  adminpwd: string;
  adminid: string | '';
  remember: boolean;  
  reduxHandleLogin: any;
  admin: { msg: string | undefined, isAuth: boolean, adminid: string | '' };
};
interface ILoginState {
  loading: boolean;
};



function mapStateToProps(state: { admin: any }): object {
  return {
    admin: state.admin,
  };
}
function mapDispatchToProps(): object {
  return {
    reduxHandleLogin,
  };
}


class Login extends React.Component<ILoginProps, ILoginState> {

  public readonly state = {
    loading: false,     // 按钮添加 loading 状态
  };
  
  public handleClick: React.MouseEventHandler = (): void => {
    this.setState({loading: true});
  }

  // 处理表单 send
  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err: string, values: any) => {
      if(!err) {
        this.props.reduxHandleLogin(values);
      }
      // 关闭loading
      this.setState({ loading: false });
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {this.props.admin.isAuth && <Redirect to="/user" />}
        <Header />
        <div className="login-container">
          <div className="login-form-box">
            <div className="login-form-title">
              <h1>Admin</h1>
            </div>
            <Spin spinning={this.state.loading}>
            {/* 表单 */}
              <Form 
                className="login-form"
                onSubmit={this.handleSubmit}
              >
                <FormItem>
                  {
                    getFieldDecorator('adminname', {
                      rules: [{ required: true, message: 'Please input your adminname!' }],
                    })(
                      <Input 
                        size="large"
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                        placeholder="adminname"
                      />
                    )
                  }
                </FormItem>
                <FormItem>
                  {
                    getFieldDecorator('adminpwd', {
                      rules: [{ required: true, message: 'Please input your pwd!' }],
                    })(
                      <Input 
                        size="large"
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                        type="password"
                        placeholder="Password"
                      />
                    )
                  }
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Remember me</Checkbox>
                  )}
                  <a href="" style={{float: 'right'}}>Forgot</a>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                    onClick={this.handleClick}
                  >Send</Button>
                </FormItem>
                <FormItem>
                  Or <Link to="/register">register now!</Link>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}


const LoginForm = Form.create()(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(LoginForm);