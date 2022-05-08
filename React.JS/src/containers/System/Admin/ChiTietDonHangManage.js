import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import "./ChiTietDonHangManage.scss"
import { FormattedMessage } from 'react-intl';
import Lightbox from 'react-image-lightbox';
import { dispatch } from '../../../redux';
import {getTTdonhangService, saveTTDH} from "../../../services/sanphamService"
import {withRouter} from "react-router";
import DonHangManage from "./DonHangManage";
import {toast} from 'react-toastify';
import Header from '../../Header/Header';
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class ChiTietDonHangManage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            trangthaiArr : '',
            ma_tt: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllTrangThaiSTART();
        // this.props.getTTdonhang(this.props.match.params.id_chitiet);
        // console.log("check tt" ,tt)
        if(this.props.match && this.props.match.params && this.props.match.params.id_chitiet)
        { 
            this.props.fetchAllChiTietDonHangSTART(this.props.match.params.id_chitiet)
            this.setState({
                ma_tt: this.props.match.params.tt_donhang
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        

        if(prevProps.trangthaiArr !== this.props.trangthaiArr)
        {
            let trangthaiArr = this.props.trangthaiArr;
            this.setState({
                trangthaiArr: trangthaiArr,
                // ma_tt: trangthaiArr && trangthaiArr.length>0 ? trangthaiArr[0].id : ''
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
    hanldeSaveSanPham = (tt, id) =>
    {
        saveTTDH({
            tt: tt,
            id: id
        })
        toast.success("Đã Thay Đổi Trạng Thái")

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
    
    render() {
        // console.log("check trangthaiArr", this.props.trangthaiArr)
        // console.log("check chitietdonhangArr",this.props.chitietdonhangArr)
       
        let chitietdonhangArr = this.props.chitietdonhangArr
        let trangthaiArr = this.props.trangthaiArr
        console.log("check ma_tt", this.state.ma_tt)
        let ma_tt = this.state.ma_tt
        return (
            <React.Fragment>
                
                <div className='chitiet-redux-container'>
                    {/* <Header/> */}
                    <div className='title'>Chi Tiết Đơn Hàng</div>
                        <div className='col-3'>
                                    <label>Trạng Thái:</label>
                                        <select className='form-control tt' type="text"
                                            onChange={(event)=>{this.onchangeInput(event, 'ma_tt')}}                                            
                                            value={ma_tt}
                                        >
                                        {trangthaiArr && trangthaiArr.length> 0 && 
                                            trangthaiArr.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.keyMap} >
                                                            {item.valueVi}
                                                        </option>
                                                    )
                                                })
                                        }
                                        </select>
                         </div>
                         <div className='col-12 mt-3 btn-createSP'>
                                    <button
                                        onClick={()=> this.hanldeSaveSanPham(this.state.ma_tt, this.props.match.params.id_chitiet)}
                                    >
                                      lưu
                                        
                                    </button>
                                </div>
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
                                        {/* console.log("imageBase64", imageBase64) */}
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
                    {/* <HomeFooter/> */}
                </div>
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        chitietdonhangArr: state.sanpham.chitietdonhangArr,
        trangthaiArr: state.sanpham.trangthaiArr,
        // tt: state.sanpham.tt
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        fetchAllChiTietDonHangSTART: (id_donhang) => dispatch(actions.fetchAllChiTietDonHangSTART(id_donhang)),
        fetchAllTrangThaiSTART: () => dispatch(actions.fetchAllTrangThaiSTART()),
        // getTTdonhang: (id) => dispatch(actions.getTTdonhang(id)),
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChiTietDonHangManage));
