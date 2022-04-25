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
import img1 from "../../../assets/images/nenQC/nen1.jpg"

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class QuanLyGiohang extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {
       
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
    render() {
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
                        <div className='TD mt-3'>
                            <div className='sanpham'>
                                <div className='image-avt'>
                                    <img src={img1}></img>
                                </div>
                                <div className='name-sp'>
                                Điện thoại OPPO Reno7 Pro 5G
                                </div>
                            </div>
                            <div className='dongia mt-5'>
                                99.000₫
                            </div>
                            <div className='soluong mt-5'>
                                2
                            </div>
                            <div className='sotien mt-5'>
                                198.000₫
                            </div>
                            <div className='action mt-5' title='xóa sản phẩm khỏi giỏ hàng'>
                            <i className="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div className='TD mt-3'>
                            <div className='sanpham'>
                                <div className='image-avt'>
                                    <img src={img1}></img>
                                </div>
                                <div className='name-sp'>
                                Điện thoại OPPO Reno7 Pro 5G
                                </div>
                            </div>
                            <div className='dongia mt-5'>
                                99.000₫
                            </div>
                            <div className='soluong mt-5'>
                                2
                            </div>
                            <div className='sotien mt-5'>
                                198.000₫
                            </div>
                            <div className='action mt-5' title='xóa sản phẩm khỏi giỏ hàng'>
                            <i className="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div className='tong mt-5'>
                            <div className='name'>Tổng Thanh Toán:</div>
                            <div className='tongtien'>198.000₫</div>
                            <button className='btn-muahang'>Mua Hàng</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyGiohang);
