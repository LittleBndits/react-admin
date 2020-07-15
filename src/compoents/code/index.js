/*
 * @Author: chan.qiulong 
 * @Date: 2020-07-15 22:51:11 
 * @Last Modified by: chan.qiulong
 * @Last Modified time: 2020-07-16 00:33:08
 */

/**
 * 自定义验证码-组件
 */
import React, { Component } from 'react'
//antd
import { Button, message } from 'antd';
// Api
import { Getcode } from '../../api/account'
// 表单校验
import { validate_Email } from '../../utils/validate'
// 定时器
let timer = null;
// class组件
class Code extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            module: props.module,
            button_text: '获取验证码',
            button_loading: false,
            button_disabled: false,
        }
    }
    /**
     * 父组件传值监听 
     */
    componentWillReceiveProps({ username,module }) {
        this.setState({
            username,
            module
        })
    }
    /**
     * 组件销毁 
     */
    componentWillUnmount() {
        // 清楚定时器
        clearInterval(timer)
    }
    /**
     * 获取验证码
     */
    getCode = (data) => {
        const username = this.state.username;
        const module = this.state.module;
        if (!username) {
            message.warning('账号不能为空！');
            return false
        }
        if (!validate_Email(username)) {
            message.warning('邮箱格式不正确！', 1);
            return false
        }
        this.setState({
            button_loading: true,
            button_text: '发送中',
        })
        let params = {
            username,
            module
        }
        console.log("LoginForm -> getCode -> params", params)
        Getcode(params).then(res => {
            message.success(res.data.message)
            // 倒计时
            this.countdown()
        }).catch(() => {
            this.setState({
                button_loading: false,
                button_text: '重新获取',
            })
        })

    }
    /**
     * 倒计时
     */
    countdown = () => {
        const that = this;
        let sec = 60;
        timer = setInterval(() => {
            if (sec <= 0) {
                that.setState({
                    button_text: '重新获取',
                    button_loading: false,
                    button_disabled: false,
                })
                clearInterval(timer)
                return
            }
            sec--;
            that.setState({
                button_text: `${sec}s`,
                button_loading: false,
                button_disabled: true,
            })
        }, 1000)
    }
    render() {
        return (
            <div>  <Button
                type="danger"
                block
                disabled={this.state.button_disabled}
                loading={this.state.button_loading}
                onClick={this.getCode}
            >{this.state.button_text}</Button></div>
        )

    }
}
export default Code;