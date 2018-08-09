import * as React from 'react';
import {
  Form, Input, Button, Spin, message
} from 'antd';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import { reduxHandleRegister } from '../../redux/admin.redux';
import { FormComponentProps } from '../../../node_modules/antd/lib/form';
import { History } from '../../../node_modules/@types/history';

const FormItem = Form.Item;



export interface IRegisterProps extends FormComponentProps {
  admin: { msg: string | undefined, isAuth: boolean };
  adminname: string;
  adminpwd: string;
  reduxHandleRegister: any;
  history: History;
};

interface IRegisterState {
  loading: boolean;
}; 



function mapStateToProps(state: { admin: object }): object {
  return {
    admin: state.admin,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleRegister,
  };
}


class Register extends React.Component<IRegisterProps, IRegisterState> {

  public readonly state = {
    loading: false,
  };

  public handleClick: React.MouseEventHandler = (): void => {
    this.setState({ loading: true });
  }

  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err: string, values: any) => {
      if(!err) {
        this.props.reduxHandleRegister(values);
      }
      // 关闭loading
      this.setState({ loading: false });
      // 提示错误框
      message.loading('请等待...', 2, () => {
        // message.error(this.props.admin.msg, 3);
        const msg = this.props.admin.msg;
        msg 
          ? message.error(msg, 3)
          : message.success('Success!', 2) && this.props.history.push('/user');
      });
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Header />
        <div className="register-container">
          <div className="register-form-box">
            <div className="register-form-title">
              <h1>Welcome</h1>
            </div>
            {/* 注册表单 */}
            <Spin spinning={this.state.loading}>
              <Form
                className="register-form"
                onSubmit={this.handleSubmit}
              >
                <FormItem>
                  {
                    getFieldDecorator('adminname', {
                      rules: [{ required: true, message: 'Please input your adminname!' }]
                    })(
                      <Input
                        size="large"
                        placeholder="adminname"
                        addonBefore="账号"
                      />
                    )
                  }
                </FormItem>
                <FormItem>
                  {
                    getFieldDecorator('adminpwd', {
                      rules: [{ required: true, message: 'Please input your pwd!' }]
                    })(
                      <Input
                        size="large"
                        type="password"
                        placeholder="Password"
                        addonBefore="密码"
                      />
                    )
                  }
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
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

const RegisterForm = Form.create()(Register);
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(RegisterForm);