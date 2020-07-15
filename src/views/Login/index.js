import React, { Component } from 'react'
// css
import './index.scss'

// 自定义组件
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formType: 'login'
        }
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    switchForm = (val) => {
        this.setState({
            formType: val
        })
    }
    render() {
        return (
            <div className="form-wrap">
                <div>
                <div className="logo">React Admin</div>
                    {this.state.formType === 'login' ? <LoginForm switchForm={this.switchForm}></LoginForm> : <RegisterForm switchForm={this.switchForm}></RegisterForm>}
                </div>
            </div>
        )
    }

}
export default Login;