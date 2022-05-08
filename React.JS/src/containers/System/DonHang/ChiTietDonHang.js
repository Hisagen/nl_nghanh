import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./ChiTietDonHang.scss"
import { FormattedMessage } from 'react-intl';
// import TableQuanLyGiohang from "./TableQuanLyGiohang"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from "../../Homepage/HomeFooter"
import img1 from "../../../assets/images/nenQC/nen1.jpg"
import {getInfoDetailSanPham, deleteGioHang, createThanhToan,createDonHang,getDonHangtheoid_donhang} from "../../../services/sanphamService"
import {withRouter} from "react-router";
import {toast} from 'react-toastify';
import {create_new_giohang, getgiohang} from "../../../services/sanphamService"
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class ChiTietDonHang extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id_chitiet)
        { 
            this.props.fetchAllChiTietDonHangSTART(this.props.match.params.id_chitiet)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
       
        
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
        this.props.deleteGioHang(data)
        //console.log('check data',data)
        // alert("click me")
    }
    handleThanhToan = async (subtotal , idUser, giohangArr) =>
    {
        

    }
    render() {
        console.log("check chitietdonhangArr",this.props.chitietdonhangArr)
        let chitietdonhangArr = this.props.chitietdonhangArr
        return (
            <React.Fragment>
                
                <div className='chitiet-redux-container'>
                    <HomeHeader/>
                    <div className='title'>Chi Tiết Đơn Hàng</div>
                    <div className='left-right mt-5'>
                        <div className='TH'>
                            <div className='title-sanpham'>Sản Phẩm</div>
                            <div className='title-dongia'>Đơn Giá</div>
                            <div className='title-soluong'>Số Lượng</div>
                            <div className='title-sotien'>Số Tiền</div>
                        </div>
                            {chitietdonhangArr && chitietdonhangArr.length >0 &&
                                chitietdonhangArr.map((item, index) =>{
                                    let imageBase64 =''
                                    if (item.avt) {
                                        imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                    }
                                    console.log("imageBase64", imageBase64)
                                    return(
                                        <div className='TD mt-3'>
                                            <div className='sanpham'>
                                                <div className='image-avt'>
                                                    <img src={imageBase64}></img>
                                                </div>
                                                <div className='name-sp'>
                                                    {item.ten_sp}
                                                </div>
                                            </div>
                                            <div className='dongia mt-5'>
                                                {item.gia_sp}
                                            </div>
                                            <div className='soluong mt-5'>
                                                {item.soluong_sp}
                                            </div>
                                            <div className='sotien mt-5 mb-5'>
                                                {item.thanhtien.toLocaleString()}
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
        chitietdonhangArr: state.sanpham.chitietdonhangArr
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllChiTietDonHangSTART: (id_donhang) => dispatch(actions.fetchAllChiTietDonHangSTART(id_donhang)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChiTietDonHang));
