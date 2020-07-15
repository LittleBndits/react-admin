import React, { Component, Fragment } from 'react'

// 組件
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
// 自定义组件
import Code from '../../compoents/code/index'
// 表单校验
import { validate_password, validate_Email } from '../../utils/validate'
// api
import { Register } from '../../api/account'
class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            code: '',
            module: 'register',
        }
    }
    //注册
    onFinish = (values) => {
        const Register_data = {
            username: this.state.username,
            password: this.state.password,
            code: this.state.code
        }
        console.log("RegisterForm -> onFinish -> Register_data", Register_data)
        Register(Register_data).then(res => {
            message.success(res.data.message)
        }).catch(res => {
            message.error(res.data.message)
        })
    };
    /* input 输入处理 */
    inputChange = (e) => {
        let val = e.target.value
        this.setState({
            username: val,//账号
        })
    };
    inputChangePassword = (e) => {
        let val = e.target.value
        this.setState({
            password: val,//密碼
        })
    };
    inputChangeCode = (e) => {
        let val = e.target.value
        this.setState({
            code: val,//验证码
        })
    };
    toggleForm = () => {
        this.props.switchForm('login')
    }
    render() {
        const { username, module } = this.state;
        const that = this;
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
                        <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            { required: true, message: '密码不能为空!' },
                            // 自定义检验
                            ({ getFieldValue }) => ({//Es6解构
                                validator(rule, value) {
                                    const passwords_val = getFieldValue('passwords');//获取再次输入密码值
                                    if (!validate_password(value)) {
                                        return Promise.reject('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
                                    }
                                    if (passwords_val && value !== passwords_val) {
                                        return Promise.reject('两次密码不一致!')
                                    }
                                    return Promise.resolve()
                                },
                            }),
                        ]}
                    >
                        <Input.Password onChange={this.inputChangePassword} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name="passwords"
                        rules={[
                            { required: true, message: '确认密码不能为空!' },
                            // 自定义检验
                            ({ getFieldValue }) => ({//Es6解构
                                validator(rule, value) {
                                    if (getFieldValue('password') !== value) {
                                        return Promise.reject('两次密码不一致!')
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                    </Form.Item>
                    <Form.Item name="code"
                        rules={[
                            { required: true, message: '验证码不能为空!' },
                            { len: 6, message: '请输入长度为6的验证码!' }
                        ]}
                    >
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input onChange={this.inputChangeCode} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                            </Col>
                            <Col span={9}>
                                <Code username={username} module={module} />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                    </Form.Item>
                </Form>
            </Fragment >
        )
    }

}
export default RegisterForm;