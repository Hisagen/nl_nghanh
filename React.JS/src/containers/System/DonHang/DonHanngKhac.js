import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils, dateFormat} from "../../../utils";
import * as actions from "../../../store/actions";
import "./DonHanngKhac.scss"
import { FormattedMessage } from 'react-intl';
// import TableQuanLyGiohang from "./TableQuanLyGiohang"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from "../../Homepage/HomeFooter"
import img1 from "../../../assets/images/nenQC/nen1.jpg"
import {getInfoDetailSanPham, deleteGioHang, createThanhToan,createDonHang} from "../../../services/sanphamService"
import {withRouter} from "react-router";
import moment from 'moment';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {create_new_giohang, getgiohang} from "../../../services/sanphamService"
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class DonHanngKhac extends Component {
    constructor(props)
    {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            idUser: '',
            donhangArr: '',
            // idDonHangNew: ''
            currentDate: '',
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
        if(this.props.history)
        {
            this.props.history.push(`/ChiTietGioHangKhach/${data}`)
        }

    }
    render() {
        console.log("check state",this.state)
        this.state.donhangArr = this.props.donhangArr
        let donhangArr = this.state.donhangArr
        // console.log("check donhangArr", donhangArr)
        let language = this.props.language
        
        return (
            <React.Fragment>                
                <div className='donhang-redux-container'>
                    <HomeHeader/>
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
                                    let formatedDate = moment(item.createdAt).format(dateFormat.SEND_TO_SERVER)
                                    return (
                                        <div className='TD mt-3 mb-5'>
                                            <div className='id mt-5'>
                                                {item.id}
                                            </div>
                                            <div className='ngaydathang mt-5'>
                                                {formatedDate}
                                            </div>
                                            <div className='ngaygiaohang mt-5'>
                                                từ 5 - 7 ngày (kể từ khi đặt hàng)
                                            </div>
                                            <div className='tongtien mt-5'>
                                                {item.tongtien}
                                            </div>
                                            <div className='trangthai mt-5'>
                                                {language === LANGUAGES.VI ? item.trangthaiData.valueVi : item.trangthaiData.valueEn}
                                            </div>
                                            <div className='xem mt-5'
                                            onClick={() => this.handleOnClickXem(item.id)}
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

                    <HomeFooter/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DonHanngKhac));
