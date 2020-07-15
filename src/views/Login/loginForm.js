import React, { Component, Fragment } from 'react'
// 組件
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 表单校验
import { validate_password, validate_Email } from '../../utils/validate'
// api
import { Login } from '../../api/account'
// 自定义组件
import Code from '../../compoents/code/index'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            module: 'login',
        }
    }
    //登录
    onFinish = (values) => {
        Login(values).then(res => {
            console.log("LoginForm -> onFinish -> res", res)
        }).catch(() => {


        })

        console.log('Received values of form: ', values);
    };
    /* input 输入处理 */
    inputChange = (e) => {
        let val = e.target.value
        console.log(val);
        this.setState({
            username: val,//账号
        })
    };

    // 切换注册
    toggleForm = () => {
        this.props.switchForm('register')
    }

    render() {

        // eslint-disable-next-line 
        const { username,module } = this.state;
        const that = this;
        return (
            <Fragment >
                <div className="form-header">
                    <div className="title">登录</div>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item name="username"
                        rules={[
                            { required: true, message: '账号不能为空!' },
                            // 自定义检验
                            ({ getFieldValue }) => ({//Es6解构
                                validator(rule, value) {
                                    if (validate_Email(value)) {
                                        that.state.code_button_disabled = false
                                        that.setState({
                                            code_button_disabled: false
                                        })
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject('请输入正确的邮箱！')
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            { required: true, message: '请输入密码!' },
                            // 自定义检验
                            ({ getFieldValue }) => ({//Es6解构
                                validator(rule, value) {
                                    if (!validate_password(value)) {
                                        return Promise.reject('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                    </Form.Item>
                    <Form.Item name="code"
                        rules={[
                            { required: true, message: '验证码不能为空!' },
                            { len: 6, message: '请输入长度为6的验证码!' },
                        ]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="验证码" />
                            </Col>
                            <Col span={9}>
                                <Code username={username} module={module}/>
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
export default LoginForm;