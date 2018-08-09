import * as React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Radio } from 'antd';
import { FormComponentProps } from '../../../node_modules/antd/lib/form';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



interface IUserDrawerProps extends FormComponentProps {
  onAddUser: any;       // Handle Add Function
};
interface IUserDrawerState {
  visible: boolean;
};




class UserDrawer extends React.Component<IUserDrawerProps, IUserDrawerState> {

  public readonly state = {
    visible: false,
  };

  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err: string, values: any) => {
      if(!err) {
        // 传递给 User
        this.props.onAddUser(values);
        this.handleToggle(e);
      }
    });
    
  }

  // Drawer show or hide
  public handleToggle: React.FormEventHandler = (): void => {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible,
      };
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button
          type="primary"
          size="large"
          onClick={this.handleToggle}
          style={{ width: '20%' }}
        >Create User</Button>
        <Drawer
          title="Create"
          width={720}
          placement="right"
          onClose={this.handleToggle}
          visible={this.state.visible}
          destroyOnClose={true}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator('useremail', {
                    rules: [{ required: true, message: 'please enter email' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="please enter email"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Job">
                  {getFieldDecorator('userjob', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter your job',
                      },
                    ],
                  })(<Input placeholder="please enter your job" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address">
                  {getFieldDecorator('useraddress', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter your address',
                      },
                    ],
                  })(<Input placeholder="please enter your address" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Gender">
                  {getFieldDecorator('usergender', {
                    initialValue: "male"
                  })(
                    <RadioGroup>
                      <RadioButton value="male">Male</RadioButton>
                      <RadioButton value="female">Female</RadioButton>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <Button
                    size="large"
                    style={{
                      marginRight: 8,
                      width: '100%'
                    }}
                    onClick={this.handleToggle}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >Submit</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form> 
        </Drawer>
      </div>
    );
  }
}



export default Form.create()(UserDrawer);