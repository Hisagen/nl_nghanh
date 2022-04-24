import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';
import HomeHeader from '../../Homepage/HomeHeader';
import "./DetailSP.scss";

import HomeFooter from "../../Homepage/HomeFooter"
import Spkhac from './Spkhac2';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avt from './Avt';
import {getInfoDetailSP} from "../../../services/userService"
import {getInfoDetailSanPham} from "../../../services/sanphamService"
import { LANGUAGES } from '../../../utils';
class DetailSP extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detailSP : {

            },
            hinh1: '',
            hinh2: '',
            hinh3: '',
        }
    }

    async  componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id)
        {   
            let id = this.props.match.params.id
            let res = await getInfoDetailSanPham(id)
            let hinh = res.data.hinhsp
            console.log("check hinh", hinh.image1)
            if(res && res.errCode === 0)
            {
                this.setState({
                    detailSP: res.data,
                    hinh1: hinh.image1,
                    hinh2: hinh.image2,
                    hinh3: hinh.image3,
                })
            }
            //console.log("check res",res)

            //  

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    render() {
        console.log("get id",this.props.match.params.id)
        let {language} = this.props;
        let detailSP = this.state;
        let sp = detailSP.detailSP;
        let avt = detailSP.detailSP.avt;
        let img1 = detailSP.hinh1;
        let img2 = detailSP.hinh2;
        let img3 = detailSP.hinh3;
        console.group("sp",sp);
        //let nameVi = '', nameEn = '';
        // if(detailSP && detailSP.typeRoleData)
        // {
        //     nameVi = `${detailSP.typeRoleData.valueVi} ${detailSP.firstName} ${detailSP.lastName}`;
        //     nameEn = `${detailSP.typeRoleData.valueEn} ${detailSP.lastName} ${detailSP.firstName}`;
        // }
        //console.log("detailSP avt",detailSP.avt)
        return (
            <>

            <HomeHeader isShowBanner = {false}/>
            <div className='sp-detail-container'>
                {/* <div className='intro-sp'>{language === LANGUAGES.VI ? nameVi : nameEn} </div>  */}
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
                        <div className='ram-sp'>
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
                        </div>
                        <div className='chung'>
                        <div className='khung mt-3'>
                            
                            <div className='btn-spyt' >
                                <i className="fas fa-heart"></i> &nbsp;
                                    Yêu Thích
                            </div>
                        </div>
                        &nbsp; &nbsp;
                        <div className='khung mt-3'>
                            <div className='btn-tvgh' >
                                <i className="fas fa-cart-arrow-down"></i> &nbsp;&nbsp;
                                Thêm Vào Giỏ Hàng
                            </div>
                        </div>
                        </div>
                        
                        <div className='gia-sp'>Giá: {sp.gia}₫</div>
                        <button className='btn-muangay'>MUA NGAY</button>
                        <p className='title-cauhinh'>Cấu hình Điện thoại {sp.ten_sp} 128GB</p>
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
                        </div>
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
                <div className='spkhac'>
                    <Spkhac/>
                </div>
               
                <div className='comment-sp'></div> 
                
                    

                <br/>
                <br/>
                <br/>
                <HomeFooter/>
            </div>
            
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        DetailSPMenuPath: state.app.DetailSPMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSP);
  