import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';
import HomeHeader from '../../Homepage/HomeHeader';
import "./DetailSP.scss";
import * as actions from "../../../store/actions";
import HomeFooter from "../../Homepage/HomeFooter"
import NoiBac from '../../Homepage/Section/NoiBac';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avt from './Avt';
import {getInfoDetailSP,  createBinhLuan, getAllBinhLuan, getAllTraLoi} from "../../../services/userService"
import {getInfoDetailSanPham, CreateNewYeuThich, create_new_giohang} from "../../../services/sanphamService"
import { LANGUAGES , CommonUtils} from '../../../utils';
import {withRouter} from "react-router";
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import moment from "moment";

class DetailSP extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detailSP : {

            },
            hinh1: '',
            hinh2: '',
            hinh3: '',
            idUser: '',
            quantity: 1,

            previewImg: '',
            avatar: '', 
            binhLuan: '',
            binhLuanArr: [],
            tl: []
        }
    }

    async  componentDidMount () {
        this.props.getGiohang(this.state.idUser)

        if(this.props.match && this.props.match.params && this.props.match.params.id)
        {   
            let id = this.props.match.params.id
            let res = await getInfoDetailSanPham(id)
            console.log("check res", res)
            let hinh = res.data.hinhsp
            //console.log("check hinh", hinh.image1)
            if(res && res.errCode === 0)
            {
                this.setState({
                    idSP: this.props.match.params.id,
                    detailSP: res.data,
                    hinh1: hinh.image1,
                    hinh2: hinh.image2,
                    hinh3: hinh.image3,
                    idUser: this.props.userInfo.id
                })
            }
            //console.log("check res",res)

            //  

            this.props.handleGetAllBinhLuan(this.state.idSP);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.binhLuans !== this.props.binhLuans) {
            let arrBL = this.props.binhLuans
            this.setState({
                binhLuanArr: arrBL,
            })
        }
    }
    handlethemvaogiohang = async (sp) =>
    {
        //console.log("View info Sản Phẩm:", sp);
        if(sp.sl_sp==0)
        { 
            toast.error("SẢN PHẨM HẾT HÀNG")
        }
        else
        {
            await create_new_giohang(this.state)
            this.props.history.push(`/giohang/${this.state.idUser}`)
            window.location.reload();

        }
    }
    handlethemvaoyeuthich = (sp, idUser) =>
    {
        this.props.createYeuThich({sp:sp, idUser:idUser})
        console.log("check sp",sp)
        window.location.reload();

    }
    onUpdateQuantity = (sp, quantity) =>
    {
        if(quantity>0)
        {
            this.setState({
                quantity: quantity
            })
        }
        if(quantity>sp.sl_sp)
        {
            this.setState({
                quantity: sp.sl_sp
            })
        }
        if(sp.sl_sp === 0)
        {
            this.setState({
                quantity: 0
            })
        }
    }
    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImg: objectURL,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
        console.log('copyState',copyState)
    }
// Time: moment().format("DD-MM-YYYY hh:mm:ss"),

    handleOnClickSave = async () => {
        await this.props.handleCreateBinhLuan({
            NoiDungBL: this.state.binhLuan,
            MaNguoiBL: this.props.userInfo.id,
            MaSP: this.state.idSP,
            TrangThai: 1,
            TrangThaiBL: 1,
            anhBL: this.state.avatar,
        })
        await this.props.handleGetAllBinhLuan(this.state.idSP);
    }

    handleOnLoad = async (data) => {
        let ne = await getAllTraLoi(data.MaSP, data.id)
        console.log('ne', ne)
        // if (ne) {
        //     // this.setState({
        //     //     tl: ne,
        //     // })
        // }
        // this.setState({
        //     tl: ne,
        // })
    }
    render() {
        console.log("state",this.state)
        let {language} = this.props;
        let detailSP = this.state;
        let sp = detailSP.detailSP;
        let avt = detailSP.detailSP.avt;
        let img1 = detailSP.hinh1;
        let img2 = detailSP.hinh2;
        let img3 = detailSP.hinh3;
        let { binhLuanArr } = this.state;
        console.log('binhLuanArr',binhLuanArr);
        let so = parseInt(sp.gia);
        let quantity = sp.sl_sp > 0 ? this.state.quantity : sp.sl_sp
        console.log("check giá sản phẩm 111111111111", sp.gia)
        return (
            <>

            <HomeHeader isShowBanner = {false}/>
            <div className='sp-detail-container'>
                {/* <div className='intro-sp'>{language === LANGUAGES.VI ? nameVi : nameEn} </div>  */}
                <div className='name-sp'>
                 {sp.ten_sp}
                </div>
                <hr/>
                <div className='thongtin-sp'>
                    <div className='anh'>
                        <div className='anh-sp'>
                            <Avt img = {avt} 
                                 img1 = {img1}
                                 img2 = {img2}
                                 img3 = {img3}
                                
                            />
                        </div>
                        <div className='khung'>
                            <div className='khung-1'>
                                <div className='anh-phu'>
                                    <div className='avt'><img src={avt}/></div>
                                    <div className='ten-anhphu'>Ảnh 1</div>
                                </div>
                                <div className='anh-phu'>
                                <div className='avt'><img src={img1}/></div>
                                    <div className='ten-anhphu'>Ảnh 2</div>
                                </div>
                                <div className='anh-phu'>
                                <div className='avt'><img src={img2}/></div>
                                    <div className='ten-anhphu'>Ảnh 3</div>
                                </div>
                                <div className='anh-phu'>
                                <div className='avt'><img src={img3}/></div>
                                    <div className='ten-anhphu'>Ảnh 4</div>
                                </div>
                            </div>   
                        </div>      
                    </div>
                    
                    <div className='bienthe-sp'>
                        {/* <div className='ram-sp'>
                            <div className='ram'>128GB</div>
                            <div className='ram'>128GB</div>
                            <div className='ram'>128GB</div>
                            <div className='ram'>128GB</div>
                        </div>
                        <div className='color-sp'>
                            <div className='color'>Vàng</div>
                            <div className='color'>Vàng</div>
                            <div className='color'>Vàng</div>
                            <div className='color'>Vàng</div>
                        </div> */}
                        
                        <div className='chung'>
                        <div className='khung mt-3'>
                            <div className='bl-dg'>
                                <div className='sao'><u>4.8<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></u> &nbsp; |
                                </div>
                                <div className='danh-gia'><u>220</u> Đánh giá  &nbsp; | </div>
                                <div className='da-ban'>2.7k đã bán</div>

                            </div>
                            <br/>
                            <div className='si-le'>
                                <div className='si-le-title' style={{width:'100px'}}>Mua Giá Bán Buôn/ Bán Sỉ</div>
                                <div >Mua từ (=10) sản phẩm chỉ với ₫21.000</div>
                            </div>
                            <div className='vanchuyen'>
                                <div className='vanchuyen-title' style={{width:'100px'}}>Vận Chuyển</div>
                                <div ><i class="fas fa-shipping-fast"></i> Miễn phí vận chuyển</div>
                            </div>
                            <div className='gia-sp mt-3'>Giá: {so.toLocaleString()}₫</div>
                            
                            <div className='btn-spyt' 
                                onClick={() => this.handlethemvaoyeuthich(sp, this.state.idUser)}
                            >
                                <i className="fas fa-heart"></i> &nbsp;
                                    Yêu Thích
                            </div>
                        </div>
                        &nbsp; &nbsp;
                        {/* <div className='khung mt-3'>
                            <div className='btn-tvgh' 
                                onClick={() => this.handlethemvaogiohang(sp)}
                            >
                                <i className="fas fa-cart-arrow-down"></i> &nbsp;&nbsp;
                                Thêm Vào Giỏ Hàng
                            </div>
                        </div> */}
                        </div>
                        <div className='soluong mt-3'>Số lượng còn: {sp.sl_sp == 0 ?"hết hàng" : sp.sl_sp}</div>
                        <div className='css-soluong mt-3'>
                            <button className='btn-soluong-tang' onClick={()=> this.onUpdateQuantity(sp, this.state.quantity-1)}><i className="fas fa-minus"></i></button>
                            <input className='text-soluong' type="text" value={quantity} disabled></input>
                            <button className='btn-soluong-giam' onClick={()=> this.onUpdateQuantity(sp, this.state.quantity+1)}><i className="fas fa-plus"></i></button>
                        </div>
                        <button className='btn-muangay'
                                onClick={() => this.handlethemvaogiohang(sp)}

                        >MUA NGAY</button>
                        {/* <p className='title-cauhinh'>Cấu hình Điện thoại {sp.ten_sp} 128GB</p>
                        <div className='cauhinh-sp'>
                            <div className='tt-1'>
                                <div className='name-cauhinh'>Màn hình:</div>
                                <div className='dulieu'>OLED6.7"Super Retina XDR</div>
                            </div>
                            <div className='tt-2'>
                                <div className='name-cauhinh'>Hệ điều hành:</div>
                                <div className='dulieu'>IOS 15</div>
                            </div>
                            <div className='tt-1'>
                                <div className='name-cauhinh'>Camera sau:</div>
                                <div className='dulieu'>3 camera 12 MP</div>
                            </div>
                            <div className='tt-2'>
                                <div className='name-cauhinh'>Camera trước:</div>
                                <div className='dulieu'>12 MP</div>
                            </div>
                            <div className='tt-1'>
                                <div className='name-cauhinh'>Chip:</div>
                                <div className='dulieu'>Apple A15 Bionic</div>
                            </div>
                            <div className='tt-2'>
                                <div className='name-cauhinh'>RAM:</div>
                                <div className='dulieu'>6 GB</div>
                            </div>
                            <div className='tt-1'>
                                <div className='name-cauhinh'>Bộ nhớ trong:</div>
                                <div className='dulieu'>128 GB</div>
                            </div>
                            <div className='tt-2'>
                                <div className='name-cauhinh'>Pin, Sạc:</div>
                                <div className='dulieu'>4352 mAh20 W</div>
                            </div>
                        </div> */}
                    </div> 
                </div> 
                <div className='chitiet-sp'>
                    <p className='title-chitiet'>Thông Tin Sản Phẩm</p>  
                </div>
                
                

                <div className='description mt-5'>
                        {sp.qc_spHTML && sp.qc_spMarkdown
                            &&
                            <div dangerouslySetInnerHTML={{__html: sp.qc_spHTML}}>
                            </div>
                                
                        }
                </div>

                <div className='binhLuan'>
                    <label className='title'>Bình luận</label>        
                        <textarea className="contentNoiDung" rows="5"
                            onChange={(event) => this.onChangeInput(event, 'binhLuan')}
                        >

                    </textarea>

                    <div className='btnBL row'>
                        <div className='col-3'>
                            <div className="preview-img-container">
                                <input
                                    id="previewImg"
                                    type="file" hidden
                                    onChange = {(event) => this.handleOnChangeImg(event)}
                                />
                                <label className="btnImg" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className="preview-img"
                                    style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                    onClick={() => this.openPreviewImage()}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-7"></div>    
                        <div className='col-2'>
                            <button className='btn-primary'
                                onClick={() => this.handleOnClickSave()}    
                            >Gửi</button> 
                        </div>
                    </div>

                        <div style={{ fontWeight: "600" }}>Có { binhLuanArr.length } bình luận</div>

                    <hr/>


                        {binhLuanArr && binhLuanArr.length > 0 && binhLuanArr.map((item, index) => {
                            let imageBase64 = '';
                            if (item.binhLuansData.avt) {
                                imageBase64 = new Buffer(item.binhLuansData.avt, 'base64').toString('binary')  
                            }

                            let anhBL = '';
                            if (item.anhBL) {
                                anhBL = new Buffer(item.anhBL, 'base64').toString('binary')  
                            }

                            // console.log(imageBase64)
                            return (
                                <>
                                    <div className="bl-ten" style={{ fontWeight: "600", fontSize: "15px" , backgroundColor: "lavender"}}>
                                        <span>
                                            <img src={imageBase64} className="img-img"  alt=" " style={{width: "30px", height: "40px", background: "center center no-repeat", backgroundSize: "contain" }}/>
                                        </span>
                                        {item.binhLuansData.firstName} {item.binhLuansData.lastName}: 
                                    </div>
                                    <div className="bl-content" style={{ fontSize: "15px", textAlign: "justify" }}>
                                        {item.NoiDungBL}
                                    </div>
                                        {anhBL?<img src={anhBL} className="img-img"  alt=" " style={{width: "50px", height: "70px", background: "center center no-repeat", backgroundSize: "contain"}}/>:''}
                                    <hr />

                                    <div onLoad={this.handleOnLoad(item)}></div>
                                </>
                            )
                        })}

                        <div className="BLcontent mt-2">
                            <div className="bl-ten" style={{ fontWeight: "600", fontSize: "15px"}}>
                                <span> <img src="" alt = "gắn hình" /> </span> Admin:     
                            </div>

                            <div className="bl-content" style={{ fontSize: "15px", textAlign: "justify"}}>
                                cảm ơn (tự mà load vô) :)))
                            </div>
                        </div>

                </div> 

                <div className='spkhac'>
                    <NoiBac/>
                </div>
               
                <div className='comment-sp'></div> 
                
                    

                <br/>
                <br/>
                <br/>
            </div>
            {this.state.isOpen === true &&
                <Lightbox
                    mainSrc={this.state.previewImg}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
            }    
            <HomeFooter/>
            
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        DetailSPMenuPath: state.app.DetailSPMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
        giohangArr: state.sanpham.giohangArr,
        binhLuans: state.sanpham.binhLuans,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGiohang: (idUser) => dispatch(actions.getGiohang(idUser)),
        createNewGioHang: (data) => dispatch(actions.createNewGioHang(data)),
        createYeuThich: (data) => dispatch(actions.createYeuThich(data)),
        handleCreateBinhLuan: (data) => dispatch(actions.handleCreateBinhLuan(data)),
        handleGetAllBinhLuan: (data) => dispatch(actions.handleGetAllBinhLuan(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSP));
  