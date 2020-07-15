import React, { Component, Fragment } from 'react'
// 組件
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


// 验证
import { validate_password, validate_Email } from '../../utils/validate'
// api
import { Login, Getcode } from '../../api/account'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            code_button_disabled: true,
            code_button_loading: false,
            code_button_text: '获取验证码'
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
    // 获取验证码
    getCode = (data) => {
        if (!this.state.username) {
            message.warning('账号不能为空！');
            return false
        }
        this.setState({
            code_button_loading: true,
            code_button_text: '发送中',
        })
        let params = {
            username: this.state.username,
            module: 'login',
        }
        console.log("LoginForm -> getCode -> params", params)
        Getcode(params).then(res => {

            console.log("LoginForm -> getCode -> res", res)
            // 倒计时
            this.countdown()
        }).catch(() => {
            this.setState({
                code_button_loading: false,
                code_button_text: '重新获取',
            })
        })

    }

    // 倒计时
    countdown = () => {
        const that = this;
        let timer = null;
        let sec = 60;
        timer = setInterval(() => {
            if (sec <= 0) {
                that.setState({
                    code_button_text: '重新获取',
                    code_button_loading: false,
                    code_button_disabled: false,
                })
                clearInterval(timer)
                return
            }
            sec--;
            that.setState({
                code_button_text: `${sec}s`,
                code_button_loading: false,
                code_button_disabled: true,
            })
        }, 1000)
    }

    // 切换注册
    toggleForm = () => {
        this.props.switchForm('register')
    }

    render() {

        // eslint-disable-next-line 
        const { username, code_button_disabled, code_button_loading, code_button_text } = this.state;
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
                            { pattern: validate_password, message: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' },
                            // 自定义检验
                            // ({ getFieldValue }) => ({//Es6解构
                            //     validator(rule, value) {
                            //         console.log("LoginForm -> validator -> value", value.length)
                            //         if (value.length < 6) {
                            //             return Promise.reject('密码不能少于6位')
                            //         } else {
                            //             return Promise.resolve()
                            //         }
                            //     },
                            // }),
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
                                <Button
                                    type="danger"
                                    block
                                    onClick={this.getCode}
                                    loading={code_button_loading}
                                    disabled={code_button_disabled}
                                >{code_button_text}</Button>
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