import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./manageCuaHang.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageCuaHang from './TableManageCuaHang';
import Header from '../../Header/Header';
import { flatMap } from 'lodash';
import { fetchAllSP } from '../../../store/actions';
class manageCuaHang extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            genderArr: [],
            previewImgURL: '',
            isOpen: false,
            
            storeName: '',
            email: '',
            password: '',
            ho: '',
            ten: '',
            sdt: '',
            diachi: '',
            gioitinh: '',
            chucvu: '',
            avt: '',

            action: '',
            userEditId: '',

            typeRole: 'R1',
        }
    }

   async componentDidMount () {
       this.props.getGenderStart();
       this.props.getRoleStart();
       this.props.getAllCuaHang("ALL");
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.genderRedux !== this.props.genderRedux)
        {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gioitinh: arrGender && arrGender.length >0 ? arrGender[0].keyMap : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux)
        {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                chucvu: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            })
        }

        if(prevProps.cuahangArr !== this.props.cuahangArr)
        {
            // console.log("cuahangArr",this.props.cuahangArr)
            let arrGender = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            this.setState(
                {
                    storeName: '',
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
            //console.log("check state m???i:", this.state)
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
            this.props.createNewCuaHang({
                storeName: this.state.storeName,
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
            this.props.getUpdateCuaHang({
                id: this.state.userEditId,
                storeName: this.state.storeName,
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
                alert("ch??a nh???p: "+arrCheck[i]);
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
                storeName: user.storeName,
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
        // console.log("check userEditId" ,user.id);
    }
    render() {
        let role = this.state.roleArr;
        let gender = this.state.genderArr
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let {email,password,ho,ten,sdt,diachi,gioitinh,chucvu,avt,storeName} = this.state
        console.log("check state", this.state)
        return (
            <div className='cuahang-redux-container'>
                <Header/>
                <div className='title'>
                    H???? TH????NG BA??N ?????? HANDMADE
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>
                                {isGetGenders === true ? 'Loading genders': ''}
                            </div>
                            <div className='col-3'>
                                <label>T??n C????a Ha??ng:</label>
                                <input className='form-control email' type="text"
                                    value={storeName}
                                    onChange={(event)=>{this.onchangeInput(event, 'storeName')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
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
                            {/* <div className="col-3">
                                <label><FormattedMessage id="manage-user.cv"/></label>
                                <select className="form-control"
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
                            </div> */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.avt"/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}


                                    />
                                    <label className='labe-upload' htmlFor='previewImg'>T???i ???nh <i className="fas fa-upload"></i></label>
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
                            {/* <div className="col-3 mb-3">
                                <label>T??m theo <FormattedMessage id="manage-user.cv"/></label>
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
                            </div> */}
                            
                            <TableManageCuaHang
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
        cuahangArr: state.cuahang.cuahangArr,

    };

};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        createNewCuaHang: (data) => dispatch(actions.createNewCuaHang(data)),
        getAllCuaHang: (idCuaHang) => dispatch(actions.getAllCuaHang(idCuaHang)),
        getUpdateCuaHang: (data) => dispatch(actions.getUpdateCuaHang(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageCuaHang);
