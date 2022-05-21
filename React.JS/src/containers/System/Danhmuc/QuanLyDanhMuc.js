import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./QuanLyDanhMuc.scss"
import { FormattedMessage } from 'react-intl';
import TableDanhMucSanPham from "./TableDanhMucSanPham"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';


const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class QuanLyDanhMuc extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            ten_dm: '',
            action: '',
            id: '',
        }
    }

    async componentDidMount() {
       this.props.fetchAllDanhMucSTART();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.danhmucArr !== this.props.danhmucArr)
        {
            // danhmucArr = this.props.danhmucArr
            // if()
            this.setState({
                ten_dm: '',
                action: CRUD_ACTIONS.CREATE,
                id: '',
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
        let arrCheck = ['ten_dm'] //,
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
            this.props.createNewDanhMuc({
                ten_dm: this.state.ten_dm
            })
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            this.props.editDanhMuc({
                ten_dm: this.state.ten_dm,
                id: this.state.id
            })
        }
    }
    handleEditDanhMucFromParent = async (danhmuc) =>
    {    
        this.setState({
            ten_dm: danhmuc.ten_dm,
            action: CRUD_ACTIONS.EDIT,
            id: danhmuc.id
        })
    }
    render() {
        let {ten_dm,} = this.state
        console.log("check component ", this.state)
        
        return (
            <React.Fragment>
                <div className='sanpham-redux-container'>
                    <div className='title my-5'>Quản lý danh mục sản phẩm</div>
                    <div className='sanpham-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3 ml-3'>
                                    <label>Tên danh mục sản phẩm:</label>
                                    <input className='form-control namesp' type="text"
                                        value={ten_dm}
                                        onChange={(event)=>{this.onchangeInput(event, 'ten_dm')}}
                                    ></input>
                                </div>
    
                                <div className='col-12 mt-3 ml-3 btn-createSP'>
                                    <button
                                        onClick={()=> this.hanldeSaveDanhMuc()}
                                        >{this.state.action === CRUD_ACTIONS.EDIT ? 
                                        <span>Lưu Danh Mục</span> : <span>Tạo Danh Mục</span>
                                         }   
                                    </button>
                                </div>
                            </div>
                            <div className='col-12 mt-3 table-sanpham'>
                                    <TableDanhMucSanPham
                                        handleEditDanhMucFromParentKey = {this.handleEditDanhMucFromParent}
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
        danhmucArr: state.sanpham.danhmucArr

    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllDanhMucSTART: () => dispatch(actions.fetchAllDanhMucSTART()),
        createNewDanhMuc:(data) => dispatch(actions.createNewDanhMuc(data)),
        editDanhMuc: (data) => dispatch(actions.editDanhMuc(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDanhMuc);
