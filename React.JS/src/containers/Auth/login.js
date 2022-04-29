import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Alert } from 'reactstrap';

import { handelLoginApi } from '../../services/userService';
import e from 'cors';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
             username: '',
             password: '',
             isShowPassword: false,
             errMessage: '',
        }
    }
    handleOnChangeUsername = (event) =>
    {
        this.setState({
            username: event.target.value    
        })
        console.log(event.target.value)
    }
    handleOnChangePassword = (event) =>
    {
        this.setState({
            password: event.target.value
        })
         console.log(event.target.value)
    }
    handelLogin = async() =>
    {
        this.setState({
            errMessage : ''
        })
        console.log('tài khoản:' , this.state.username, 'mật khẩu:' , this.state.password);
        console.log('dữ liệu:', this.state);
        try{
            let data = await handelLoginApi(this.state.username, this.state.password);
            console.log("data",data)
            if(data && data.errCode !==0)
            {
                this.setState({
                    errMessage: data.message,
                })
            }
            if(data && data.errCode === 0)
            {
                this.props.userLoginSuccess(data.user);
                console.log("thành công");
            }
        }catch(e)
        {
            if(e.response)
            {
                if(e.response.data)
                {
                    this.setState({
                    errMessage: e.response.data.message
                })
                }
            }
            //console.log(e);
            console.log('sin', e.response)
            
        }
       
    }
    handleShowHidePassword = () =>
    {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
        //<i class="fas fa-eye-slash"></i>
    }
    handleKeyDown = (event) =>
    {
        if(event.key === "Enter" || event.code === 113)
        {
            this.handelLogin()
        }
    }
    render() {
        return (
            <div className='login-background'>

                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Tên tài khoản</label>
                            <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Nhập tài khoản..'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUsername(event)}
                            ></input>
                            
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu</label>
                            <div className='custom-input-password'>
                                <input 
                                    type= { this.state.isShowPassword ? 'text' : 'password' }                  
                                    className='form-control' 
                                    placeholder='Nhập mật khẩu'
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                    ></input>

                               <span
                                onClick={() => { this.handleShowHidePassword()
                                }}
                               ><i class= {this.state.isShowPassword ? 'fas fa-eye':'fas fa-eye-slash'}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 text-center'>
                         <button className='btn-login' onClick={() => {this.handelLogin()} }>Log in</button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Quên mật khẩu</span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                         <span className='text-order-login'>Đăng nhập bằng cách khác</span> 
                        </div>
                        <div className='col-12  icon'>
                            <label><i className="fab fa-facebook"></i></label>
                            <label><i class="fab fa-google-plus-g"></i></label>
                            <label><i className="fab fa-twitter"></i></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
