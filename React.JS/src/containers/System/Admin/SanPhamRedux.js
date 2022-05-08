import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
// import "./sanphamReducer.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { flatMap } from 'lodash';
import { fetchAllSP } from '../../../store/actions';
class sanphamReducer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,
            
            id: '',
            ten_sp: '',
            qc_sp: '',
            sl_sp: '',
            thangthai: '',
            msadmin: '',
            ma_loaisp: '',


            action: '',
            sanphamEditId: '',

        }
    }

   async componentDidMount () {
       this.props.getGenderStart();
       this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        if(prevProps.listUser !== this.props.listUser)
        {
            console.log("listUser",this.props.listUser)
            let arrGender = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            this.setState(
                {
                    email: '',
                    password: '',
                    ho: '',
                    ten: '',
                    sdt: '',
                    diachi: '',
                    gioitinh: arrGender && arrGender.length >0 ? arrGender[0].keyMap : '',
                    chucvu: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                    avt: '',
                    action: CRUD_ACTIONS.CREATE,
                    previewImgURL: ''
                }
            )
        }
    }

    handleOnchangeImage = async (event) =>
    {
        let data = event.target.files;
        let file = data[0];
        if(file)
        {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avt: base64
            })
            //console.log("check state mới:", this.state)
        }
    }
    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    } 
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();

        if(isValid === false) return;

        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE)
        {
            this.props.createNewUser({
                firstName: this.state.ho,
                lastName: this.state.ten,
                password: this.state.password,
                email: this.state.email,
                address: this.state.diachi,
                sdt: this.state.sdt,
                gender: this.state.gioitinh,
                typeRole: this.state.chucvu,
                avt: this.state.avt,
                
        })
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            this.props.editsanphamReducer({
                id: this.state.id,
                firstName: this.state.ho,
                lastName: this.state.ten,
                password: this.state.password,
                email: this.state.email,
                address: this.state.diachi,
                sdt: this.state.sdt,
                gender: this.state.gioitinh,
                typeRole: this.state.chucvu,
                avt: this.state.avt,
                //action: CRUD_ACTIONS.CREATE,
            })
        }

        // fire redux action 
        
       
    }

    onchangeInput = (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })  
    }

    onchangeInputTypeRole = (event, typeRole) => {
        let copyState = {...this.state};

        copyState[typeRole] = event.target.value;

        this.setState({
            ...copyState
        })  
    }    

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["email","password","ho","ten","sdt","diachi"]
        for(let i=0; i<arrCheck.length; i++)
        {
            if(!this.state[arrCheck[i]])
            {
                isValid = false;
                alert("chưa nhập: ",arrCheck[i]);
                break;
            }
        }

        return isValid;
    }

    handleEditUserFromParent = (user) =>
    {
        let imageBase64 = '';
        if(user.avt)
        {
            imageBase64 = new Buffer(user.avt, 'base64').toString('binary');
            
        }
        
        this.setState(
            {
                userEditId: user.id,
                email: user.email,
                password: "user.password",
                ho: user.firstName,
                ten: user.lastName,
                sdt: user.sdt,
                diachi: user.address,
                gioitinh: user.gender,
                chucvu: user.typeRole,
                avt: '',
                previewImgURL: imageBase64,
                action: CRUD_ACTIONS.EDIT,
                
            }
        )
        console.log("check userEditId" ,user.id);
    }
    render() {
        let role = this.state.roleArr;
        let gender = this.state.genderArr
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let {email,password,ho,ten,sdt,diachi,gioitinh,chucvu,avt} = this.state
        console.log("check state component:",this.state)

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux Nguyễn Ra Sin
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>
                                {isGetGenders === true ? 'Loading genders': ''}
                            </div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control email' type="email"
                                    value={email}
                                    onChange={(event)=>{this.onchangeInput(event, 'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Password</label>
                                <input className='form-control password' type="password"
                                    value={password}
                                    onChange={(event)=>{this.onchangeInput(event, 'password')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.ho"/></label>
                                <input className='form-control ho' type="text"
                                    value={ho}
                                    onChange={(event)=>{this.onchangeInput(event, 'ho')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.ten"/></label>
                                <input className='form-control ten' type="text"
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
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gt"/></label>
                                <select class="form-control" 
                                    
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
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.cv"/></label>
                                <select class="form-control"
                                    onChange={(event)=>{this.onchangeInput(event, 'chucvu')}}
                                    value = {chucvu}
                                >
                                    {role && role.length > 0 && 
                                        role.map((item, index) =>{
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.avt"/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}


                                    />
                                    <label className='labe-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image' 

                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={() => this.openPreviewImage()}
                                    />
                                </div>
                            </div>
                            <div className='col-12 my-2'>                            
                                <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} 
                                     onClick={() => this.handleSaveUser()}
                                >
                                
                                {this.state.action === CRUD_ACTIONS.EDIT ? 
                                    <FormattedMessage id="manage-user.edit"/>
                                    :<FormattedMessage id="manage-user.save"/>
                                }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                            
                            </div>
                            <div className="col-3 mb-3">
                                <label>Tìm theo <FormattedMessage id="manage-user.cv"/></label>
                                <select class="form-control"
                                    onChange={(event)=>{this.onchangeInput(event, 'typeRole')}}
                                    //value={this.props.typeRole === '' ? this.props.typeRole="R1" : this.props.typeRole="R2"}
                                >
                                    {role && role.length > 0 && 
                                        role.map((item, index) =>{
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            
                            <TableManageUser
                                handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                action = {this.state.action}
                            />
                        </div>
                    </div>
                </div>

                
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUser: state.admin.users,  
        listSanPham: state.sanpham.sanphams

    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSP: (id) => dispatch(actions.fetchAllSP()),
        //fetchAllSANPHAM: () => dispatch(actions.fetchAllSANPHAM())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(sanphamReducer);
