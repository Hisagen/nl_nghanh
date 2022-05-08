import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./DonHangManage.scss"
import { FormattedMessage } from 'react-intl';
// import TableQuanLyGiohang from "./TableQuanLyGiohang"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';
import Header from '../../Header/Header';
import {withRouter} from "react-router";
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {create_new_giohang, getgiohang} from "../../../services/sanphamService"
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class DonHangManage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            idUser: '',
            donhangArr: '',
            // idDonHangNew: ''
        }
    }

    async componentDidMount() {
        //await this.props.processLogout()
           this.props.fetchAllDonHangSTART()
                   
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.donhangArr !== this.props.donhangArr)
        {
            this.setState({
                donhangArr : this.props.donhangArr

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
        
    }
    handleEditLoaispFromParent = async (loaisp) =>
    {    
        
    }
    handleDeleteGioHang = async (data) =>
    {
    
    }
    handleOnClickXem =  (data) =>
    {
        console.log("check data", data)
        if(this.props.history)
        {
            this.props.history.push(`/ChiTietGioHangKhachAdmin/${data.id}/${data.trangthai}`)
        }
    }   
    render() {
        console.log("check state",this.state)
        this.state.donhangArr = this.props.donhangArr
        let donhangArr = this.state.donhangArr
        console.log("check donhangArr", donhangArr)
        let language = this.props.language
        return (
            <React.Fragment>                
                <div className='donhang-redux-container'>
                    <Header/>
                    <div className='title'>Đơn Hàng Của Bạn</div>
                    <div className='left-right mt-5'>
                        <div className='TH'>
                            <div className='title-sanpham'>ID</div>
                            <div className='title-dongia'>Ngày Đặt</div>
                            <div className='title-soluong'>Ngày Giao</div>
                            <div className='title-action'>Tổng Tiền</div>
                            <div className='title-action'>Trạng Thái</div>
                            <div className='title-action'>Chi Tiết</div>


                        </div>        
                            {donhangArr && donhangArr.length >0 &&
                                donhangArr.map((item,index) =>{
                                    {/* console.log("check item.trangthaiData",item.trangthaiData) */}

                                    return (
                                        <div className='TD mt-3 mb-5'>
                                            <div className='id mt-5'>
                                                {item.id}
                                            </div>
                                            <div className='ngaydathang mt-5'>
                                                {item.ngaydathang}
                                            </div>
                                            <div className='ngaygiaohang mt-5'>
                                                23213242342
                                            </div>
                                            <div className='tongtien mt-5'>
                                                {item.tongtien}
                                            </div>
                                            <div className='trangthai mt-5'>
                                                {language === LANGUAGES.VI ? item.trangthaiData.valueVi : item.trangthaiData.valueEn}
                                            </div>
                                            <div className='xem mt-5'
                                            onClick={() => this.handleOnClickXem(item)}
                                            >
                                               <i className="fas fa-info"></i>    
                                            {/* <Link to='/ChiTietGioHangKhach/:${}'>
                                            </Link> */}
                                            </div>
                                        </div>
                                    )
                                })

                            }
                                        
                    </div>

                    {/* <HomeFooter/> */}
                </div>
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        donhangArr: state.sanpham.donhangArr,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllDonHangSTART: () => dispatch(actions.fetchAllDonHangSTART()),
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DonHangManage));
