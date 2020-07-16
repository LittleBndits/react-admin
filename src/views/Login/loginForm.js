import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// 組件
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, FileProtectOutlined } from '@ant-design/icons';
// 表单校验
import { validate_password, validate_Email } from '../../utils/validate'
// api
import { Login } from '../../api/account'
// 自定义组件
import Code from '../../compoents/code/index'
import {setToken} from '../../utils/session'
// 加密
import CryptoJs from 'crypto-js'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            code: '',
            module: 'login',
            loading: false,
        }
    }
    //登录
    onFinish = (values) => {
        this.setState({
            loading: true
        })
        const ps = CryptoJs.MD5(this.state.password).toString()
        const Login_Data = {
            username: this.state.username,
            password: ps,
            code: this.state.code
        }
        // console.log("LoginForm -> onFinish -> Login_Data", Login_Data)
        Login(Login_Data).then(res => {
            const resdata = res.data;
            if (resdata.resCode === 0) {
                this.setState({
                    loading: false
                })
                message.success(resdata.message)
                setToken(resdata.data.token)
                // 路由跳转
                this.props.history.push('/Index')
            }
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    };
    /* input 输入处理 */
    inputChange = (e) => {
        let val = e.target.value
        this.setState({
            username: val,//账号
        })
    };
    inputChangePassWord = (e) => {
        let val = e.target.value
        this.setState({
            password: val,//密码
        })
    };
    inputChangeCode = (e) => {
        let val = e.target.value
        this.setState({
            code: val,//验证码
        })
    };

    // 切换注册
    toggleForm = () => {
        this.props.switchForm('register')
    }
    // 显示隐藏loading
    showLoading = () => {
        const isload = this.state.loading
        this.setState({
            loading: !isload
        })
    }
    render() {
        // eslint-disable-next-line 
        const { username, module, loading } = this.state;
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
                        <Input.Password onChange={this.inputChangePassWord} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                    </Form.Item>
                    <Form.Item name="code"
                        rules={[
                            { required: true, message: '验证码不能为空!' },
                            { len: 6, message: '请输入长度为6的验证码!' },
                        ]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input onChange={this.inputChangeCode} prefix={<FileProtectOutlined className="site-form-item-icon" />} placeholder="验证码" />
                            </Col>
                            <Col span={9}>
                                <Code username={username} module={module} />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>登录</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }

}
export default withRouter(LoginForm);