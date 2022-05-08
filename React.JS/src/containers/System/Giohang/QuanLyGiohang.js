import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./QuanLyGiohang.scss"
import { FormattedMessage } from 'react-intl';
// import TableQuanLyGiohang from "./TableQuanLyGiohang"
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from "../../Homepage/HomeFooter"
import img1 from "../../../assets/images/nenQC/nen1.jpg"
import {getInfoDetailSanPham, deleteGioHang, createThanhToan,createDonHang,getDiaChiFromUserSerVice} from "../../../services/sanphamService"
import {withRouter} from "react-router";
import {toast} from 'react-toastify';
import {create_new_giohang, getgiohang} from "../../../services/sanphamService"
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class QuanLyGiohang extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            detailSP: {
            },
            idUser: '',
            // idDonHangNew: ''
            diachiArr : [],
            addressNew: '',
            ten_nguoidung: '',
        }
    }

    async componentDidMount() {
                this.props.getDiaChiFromUser(this.state.idUser)
                this.state.diachiArr = this.props.diachiArr;
                await  this.props.fetchAllGioHangSTART()
                if(this.props.match && this.props.match.params && this.props.match.params.id)
                {   
                    let id = this.props.match.params.id
                    // console.log("id",id)
                    let res = await getInfoDetailSanPham(id)
                    // let hinh = res.data.hinhsp
                    // console.log("check res", res)
                    if(res && res.errCode === 0)
                    {
                        this.setState({
                            detailSP: res,
                            idUser: this.props.userInfo
                        })
                        // let data = this.state.detailSP.data
                        // console.log("check data",data)
                        
                    }
                }       
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.diachiArr !== this.props.diachiArr)
        {
            let diachiArr = this.props.diachiArr
            this.setState({
                // diachiArr: this.props.diachiArr,
                addressNew: diachiArr && diachiArr.length>0 ? diachiArr[0].address: ''
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
   
    handleDeleteGioHang = async (data) =>
    {
        this.props.deleteGioHang(data)
        //console.log('check data',data)
        // alert("click me")
    }
    handleThanhToan = async (subtotal , idUser, giohangArr, addressNew) =>
    {
        let res = await createThanhToan({
            ma_nguoidung: this.state.idUser,
            tongtien:subtotal,
            idUser: idUser,
            giohang: giohangArr,
            addressNew: addressNew
            // ma_nhanvien:
        })
        // console.log("check res.iddonhang",res.iddonhang)
        if(res && res.errCode === 0)
        {
            // this.state.idDonHangNew = res.iddonhang
            toast.success("ĐẶT HÀNG THÀNH CÔNG")
            await  this.props.fetchAllGioHangSTART()
            // console.log("check this.state.idUser",this.state.idUser);
            // createDonHang({
            //     giohangArr
            // })
        }

    }
    render() {
       
        let diachiArr = this.props.diachiArr
        console.log("check this.state.diachiArr", this.state.diachiArr)
        let giohangArr = this.props.giohangArr 
        this.state.idUser = this.props.userInfo.id
        this.state.ten_nguoidung = this.props.userInfo.lastName
        let addressNew = this.state.addressNew;
        let ten_nguoidung = this.state.ten_nguoidung
        console.log("check state", this.state)
        const subtotal = giohangArr.reduce(
            (acc, item) => acc*1 + item.soluong_sp * item.gia_sp,
            0
          );
        return (
            <React.Fragment>
                
                <div className='giohang-redux-container'>
                    <HomeHeader/>
                    <div className='title'>Giỏ Hàng</div>
                    <div className='left-right mt-5'>
                        <div className='TH'>
                            <div className='title-sanpham'>Sản Phẩm</div>
                            <div className='title-dongia'>Đơn Giá</div>
                            <div className='title-soluong'>Số Lượng</div>
                            <div className='title-sotien'>Số Tiền</div>
                            <div className='title-action'>Action</div>
                        </div>
                        
                            {giohangArr && giohangArr.length > 0 && 
                                giohangArr.map((item, index) =>{
                                   
                                    let imageBase64 =''
                                    if (item.avt) {
                                        imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                    }
                                    {/* let thanhtien = thanhtien + item[index].thanhtien */}
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
                                                {item.gia_sp.toLocaleString()}₫
                                            </div>
                                            <div className='soluong mt-5'>
                                                {item.soluong_sp}
                                            </div>
                                            <div className='sotien mt-5'>
                                                {item.thanhtien.toLocaleString()}₫
                                            </div>
                                            <div className='action mt-5' title='xóa sản phẩm khỏi giỏ hàng'
                                                onClick={() => this.handleDeleteGioHang(item)}
                                            >
                                            <i className="fas fa-minus-circle"></i>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        <div className='text-center'>Thông Tin Khách Hàng
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3'>
                                    <label>Tên:</label>
                                        <input className='form-control email' type="text"
                                            value={ten_nguoidung}
                                            // onChange={(event)=>{this.onchangeInput(event, 'email')}}
                                            // disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        ></input>                                    
                                </div>  
                                <div className='col-3'>
                                    <label>Địa Chỉ:</label>
                                    <select className='form-control ttsp'
                                        onChange={(event)=>{this.onchangeInput(event, 'addressNew')}}
                                        value={addressNew}
                                    >
                                        {diachiArr && diachiArr.length> 0 && 
                                            diachiArr.map((item, index) =>{
                                                console.log("check item",item)
                                                    return (
                                                        <option key={index} value={item.address}>
                                                        {item.address}
                                                        </option>
                                                    )
                                                })
                                        }
                                    </select>                                 
                                </div>                            
                            </div>
                        </div>
                        
                        <div className='tong mt-5 mb-5'>
                            <div className='name'>Tổng Thanh Toán:</div>
                            <div className='tongtien'>{subtotal.toLocaleString()}₫</div>
                            <div onClick={()=> this.handleThanhToan(subtotal, this.state.idUser, giohangArr, addressNew)}>
                                <button className='btn-muahang'>Thanh Toán</button>
                            </div>
                        </div>
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
        giohangArr: state.sanpham.giohangArr,
        diachiArr: state.sanpham.diachiArr
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllGioHangSTART: () => dispatch(actions.fetchAllGioHangSTART()),
        createNewGioHang: (data) => dispatch(actions.createNewGioHang(data)),
        deleteGioHang: (data) => dispatch(actions.hanldedeleteGioHang(data)),
        getDiaChiFromUser: (idUser) => dispatch(actions.getDiaChiFromUser(idUser)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuanLyGiohang));
