import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./QuanLyLoaiSP.scss"
import { FormattedMessage } from 'react-intl';
import TableQuanLyLoaiSP from "./TableQuanLyLoaiSP"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';


const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class QuanLyLoaiSP extends Component {
    constructor(props)
    {
        //console.log("this.props.danhmucArr[0]",this.props.danhmucArr[0])
        super(props);
        this.state = {
            ten_loaisp: '',
            action: '',
            id: '',
            ma_dm:'',
            arrDanhmuc: [],
        }
    }

    async componentDidMount() {
       this.props.fetchAllLoaiSanPhamSTART();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        
        if(prevProps.danhmucArr !== this.props.danhmucArr)
        {
            let danhmucArr = this.props.danhmucArr
                this.setState({
                    arrDanhmuc: danhmucArr,
                    ma_dm: danhmucArr && danhmucArr.length>0 ? danhmucArr[0].id : ''
                })
            
        }
        if(prevProps.loaispArr !==this.props.loaispArr)
        {
            this.setState({
                ten_loaisp: '',
                action: CRUD_ACTIONS.CREATE,
                id: '',
                //ma_dm: '',
            })
        }
    }
    onchangeInput = (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }) 
        console.log("dsfsf",copyState)
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['ten_loaisp'] //,
        //console.log("check arrCheck",arrCheck)
        for(let i=0; i<arrCheck.length; i++)
        {
            if(!this.state[arrCheck[i]])
            {
                isValid = false;
                alert("chưa nhập: "+arrCheck[i]);
                break;
            }
        }

        return isValid;
    }
    hanldeSaveDanhMuc = () =>
    {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        
        let {action} = this.state;
        if(action === CRUD_ACTIONS.CREATE)
        {
            this.props.createNewLoaisp({
                ten_loaisp: this.state.ten_loaisp,
                ma_dm: this.state.ma_dm,
            })
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            this.props.editLoaisp({
                ten_loaisp: this.state.ten_loaisp,
                id: this.state.id,
                ma_dm: this.state.ma_dm
            })
        }
    }
    handleEditLoaispFromParent = async (loaisp) =>
    {    
        this.setState({
            ten_loaisp: loaisp.ten_loaisp,
            action: CRUD_ACTIONS.EDIT,
            id: loaisp.id,
            ma_dm: loaisp.ma_dm
        })
    }
    render() {
        let {ten_loaisp,ma_dm} = this.state
        // console.log("check component ", this.state)
        let danhmucArr = this.props.danhmucArr
        // console.log("check mảng dannh mục", danhmucArr)
        return (
            <React.Fragment>
                <div className='sanpham-redux-container'>
                    <div className='title my-5'>Quản lý loại sản phẩm</div>
                    <div className='sanpham-redux-body'>
                        <div className='container'>
                            <div className='row'>
                            <div className='col-3 ml-3'>
                                    <label>Danh Mục:</label>
                                        <select className='form-control loaisp' type="text"
                                            onChange={(event)=>{this.onchangeInput(event, 'ma_dm')}}
                                            value={ma_dm}
                                        >
                                        {danhmucArr && danhmucArr.length> 0 && 
                                                danhmucArr.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.ten_dm}
                                                        </option>
                                                    )
                                                })
                                        }
                                        </select>
                                </div>
                                <div className='col-3'>
                                    <label>Tên loại sản phẩm:</label>
                                    <input className='form-control namesp' type="text"
                                        value={ten_loaisp}
                                        onChange={(event)=>{this.onchangeInput(event, 'ten_loaisp')}}
                                    ></input>
                                </div>
    
                                <div className='col-12 mt-3 ml-3 btn-createSP'>
                                    <button
                                        onClick={()=> this.hanldeSaveDanhMuc()}
                                        >{this.state.action === CRUD_ACTIONS.EDIT ? 
                                        <span>Lưu Loại Sản Phẩm</span> : <span>Tạo Loại Sản Phẩm</span>
                                        }   
                                    </button>
                                </div>
                            </div>
                            <div className='col-12 mt-3 table-sanpham'>
                                    <TableQuanLyLoaiSP
                                        handleEditLoaispFromParentKey = {this.handleEditLoaispFromParent}
                                        action = {this.state.action}
                                    />
                            </div> 
                        </div>
                    </div>
                </div>
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        danhmucArr: state.sanpham.danhmucArr,
        loaispArr: state.sanpham.loaispArr,
        //danhmucArr: state.sanpham.danhmucArr
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllDanhMucSTART: () => dispatch(actions.fetchAllDanhMucSTART()),
        fetchAllLoaiSanPhamSTART: () => dispatch(actions.fetchAllLoaiSanPhamSTART()),
        createNewLoaisp: (data) => dispatch(actions.createNewLoaisp(data)),
        editLoaisp: (data) => dispatch(actions.editLoaisp(data)),

        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyLoaiSP);
