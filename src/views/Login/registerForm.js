import React, { Component, Fragment } from 'react'

// 組件
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''

        }
    }
    toggleForm = () => {
        this.props.switchForm('login')
    }
    render() {
        return (
            <Fragment >
                <div className="form-header">
                    <div className="title">账号注册</div>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={() => this.onFinish}
                >
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: 'Please input your code!' }]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                            </Col>
                            <Col span={9}>
                                <Button type="danger" block>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }

}
export default RegisterForm;