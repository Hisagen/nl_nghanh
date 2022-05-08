import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../../store/actions";

import './DangKy.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Alert } from 'reactstrap';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import {createNewUserService,handelLoginApi} from "../../../services/userService"
import e from 'cors';
import {withRouter} from "react-router";
class DangKy extends Component {
    constructor(props) {
        super(props);
        this.state ={
             username: '',
             password: '',
             isShowPassword: false,
             errMessage: '',
             ho: '',
             ten: '',
             sdt: '',
             diachi: '',
             gioitinh: '',
             chucvu: 'R2',
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.genderRedux !== this.props.genderRedux)
        {
            let arrGender = this.props.genderRedux;
            this.setState({
                gioitinh: arrGender && arrGender.length >0 ? arrGender[0].keyMap : ''
            })
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
        // console.log('tài khoản:' , this.state.username, 'mật khẩu:' , this.state.password);
        // console.log('dữ liệu:', this.state);
        // try{
        //     let data = await handelLoginApi(this.state.username, this.state.password);
        //     console.log("data",data)
        //     if(data && data.errCode !==0)
        //     {
        //         this.setState({
        //             errMessage: data.message,
        //         })
        //     }
        //     if(data && data.errCode === 0)
        //     {
        //         this.props.userLoginSuccess(data.user);
        //         console.log("thành công");
        //     }
        // }catch(e)
        // {
        //     if(e.response)
        //     {
        //         if(e.response.data)
        //         {
        //             this.setState({
        //             errMessage: e.response.data.message
        //         })
        //         }
        //     }
        //     //console.log(e);
        //     console.log('sin', e.response)
            
        // }
        // let res = {}
        let res =  await createNewUserService({
            email: this.state.username,
            password: this.state.password,
            firstName: this.state.ho,
            lastName: this.state.ten,
            sdt: this.state.sdt,
            address: this.state.diachi,
            gender: this.state.gioitinh,
            typeRole: 'R2',
        })

        if(res && res.errCode == 0)
        {
            console.log("check res", res)
            let data = await handelLoginApi(this.state.username, this.state.password);
            this.props.userLoginSuccess(data.user);
            console.log("thành công");
            this.props.history.push(`/home`)
        }        
    }
    async componentDidMount () {
        this.props.getGenderStart();
     }
    handleShowHidePassword = () =>
    {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
        //<i className="fas fa-eye-slash"></i>
    }
    handleKeyDown = (event) =>
    {
        if(event.key === "Enter" || event.code === 113)
        {
            this.handelLogin()
        }
    }
    onchangeInput = (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })  
    }
    render() {
        // console.log("typeRole", this.props.typeRole)
        let {email,password,ho,ten,sdt,diachi,gioitinh,chucvu,avt} = this.state
        let language = this.props.language
        let gender = this.props.genderRedux
        return (
            <div className='Registration-background'>

                <div className='Registration-container'>
                    <div className='Registration-content row'>
                        <div className='col-12 text-Registration'>Đăng Ký</div>
                        <div className='col-3 form-group Registration-input'>
                            <label>Tên tài khoản</label>
                            <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Nhập tài khoản..'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUsername(event)}
                            ></input>
                            
                        </div>
                        <div className='col-3 form-group Registration-input'>
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
                               ><i className= {this.state.isShowPassword ? 'fas fa-eye':'fas fa-eye-slash'}></i></span>
                            </div>
                        </div>
                        <div className='col-3'>
                                <label><FormattedMessage id="manage-user.ho"/></label>
                                <input className='form-control ho mt-2' type="text"
                                    value={ho}
                                    onChange={(event)=>{this.onchangeInput(event, 'ho')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.ten"/></label>
                                <input className='form-control ten mt-2' type="text"
                                    value={ten}
                                    onChange={(event)=>{this.onchangeInput(event, 'ten')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.sdt"/></label>
                                <input className='form-control ten' type="text"
                                    value={sdt}
                                    onChange={(event)=>{this.onchangeInput(event, 'sdt')}}
                                ></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.dc"/></label>
                                <input className='form-control diachi' type="text"
                                    value={diachi}
                                    onChange={(event)=>{this.onchangeInput(event, 'diachi')}}
                                ></input>
                            </div>
                            <div class="col-3">
                                <label><FormattedMessage id="manage-user.gt"/></label>
                                <select className="form-control" 
                                    
                                    onChange={(event)=>{this.onchangeInput(event, 'gioitinh')}}
                                    value = {gioitinh}
                                >
                                    {gender && gender.length> 0 && 
                                            gender.map((item, index) =>{
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                    }
                                </select>
                            </div>
                        
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-3 text-center mt-5'>
                         <button className='btn-Registration' onClick={() => {this.handelLogin()} }>Registration</button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Quên mật khẩu</span>
                        </div>
                        {/* <div className='col-12 text-center mt-5'>
                         <span className='text-order-Registration'>Đăng nhập bằng cách khác</span> 
                        </div> */}
                        {/* <div className='col-12  icon'>
                            <label><i className="fab fa-facebook"></i></label>
                            <label><i className="fab fa-google-plus-g"></i></label>
                            <label><i className="fab fa-twitter"></i></label>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DangKy));
