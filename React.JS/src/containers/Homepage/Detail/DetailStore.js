import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./DetailStore.scss";
import logo from "../../../assets/images/ShopHome/logo1.png";
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import {withRouter} from "react-router";
import * as actions from "../../../store/actions";

class DetailStore extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            cuahangArr : [],
            storeName: '',
        }
    }
    async componentDidMount(){
        await this.props.getAllCuaHang(this.props.match.params.id); /// LẤY THÔNG TIN CHI TIẾT MỘT CỬA HÀNG
        let cuahangArr = this.props.cuahangArr 
        console.log("check cuahangArr",cuahangArr)
        this.setState({
            cuahangArr: cuahangArr,
            storeName: cuahangArr.cuahang.storeName
        })

    
    }
    async componentDidUpdate(prevProps, prevState, snapshot)
    {

        // if(prevProps.cuahangArr !== this.props.cuahangArr)
        // {
        //     this.setState({
        //         cuahangArr: this.props.cuahangArr
        //     })
        // }
    }
   async OnclickTatCaSanPham() 
    {
        this.props.history.push(`/all-sanpham-mot-cuahang/${this.props.match.params.id}`)
    }
    render() {
        // console.log("check thông tin cửa hàng", this.state.cuahangArr)
        let data = this.state.cuahangArr
        let storeName = this.state.storeName
        let imageBase64 =''
        if(data)
        {
            
                if (data.avt) {
                    imageBase64 = new Buffer(data.avt, 'base64').toString('binary')  
                }
        }
        // console.log("check sanphamtheocuahang", this.props.sanphamtheocuahang)
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };
        return (
            <div className='Shop'>
                <HomeHeader/>
                <div className='TT_Shop'>
                    <div className='background_Shop'>
                        <div className='avt'>
                            <div className='avt_Shop'>
                                <img className='img1' src={imageBase64}/>
                                <div className='logo'><img className='img2' src={logo}/></div>
                            </div>

                            <div className='name_Shop'>
                                <div className='name'> {storeName}</div>
                                <div className='time'>Online 8 phút trước</div>
                            </div>
                        </div>
                        
                        <div className='btn_follow'>
                            <button>  
                                <i class="fas fa-plus"></i> 
                                &nbsp; THEO DÕI
                                
                            </button>
                            
                        </div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <div className='col-1'>
                        <div className='khung'>
                            <div className='sp'>
                                <div className='icon_sp'><i class="fab fa-product-hunt"></i></div> &nbsp;&nbsp;
                                <div className='name_sp'>Sản Phẩm:</div> &nbsp;
                                <div className='vl_sp'>1,1k</div>
                            </div>
                            
                            <div className='fl'>
                                <div className='icon_fl'><i class="fas fa-user-plus"></i></div> &nbsp;&nbsp;
                                <div className='name_fl'>Đang Theo:</div> &nbsp;
                                <div className='vl_fl'>850</div>
                            </div>

                            <div className='tl'>
                                <div className='icon_tl'><i class="fas fa-comment"></i></div> &nbsp;&nbsp;
                                <div className='name_tl'>Tỷ Lệ Chat Phản Hồi:</div> &nbsp;
                                <div className='vl_tl'>1,1k (Trong Vài Giờ) <i class="far fa-question-circle"></i></div>
                            </div>
                        </div>
                    </div>

                    <div className='col-2'>
                        <div className='khung'>
                            <div className='sp'>
                                <div className='icon_sp'><i class="fas fa-users"></i></div> &nbsp;&nbsp;
                                <div className='name_sp'>Người theo dõi:</div> &nbsp;
                                <div className='vl_sp'>11,1k</div>
                            </div>
                            
                            <div className='fl'>
                                <div className='icon_fl'><i class="fas fa-star"></i></div> &nbsp;&nbsp;
                                <div className='name_fl'>Đánh giá:</div> &nbsp;
                                <div className='vl_fl'>850</div>
                            </div>

                            <div className='tl'>
                                <div className='icon_tl'><i class="fas fa-user-check"></i></div> &nbsp;&nbsp;
                                <div className='name_tl'>Tham gia:</div> &nbsp;
                                <div className='vl_tl'>3 năm trước </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='khung_menu sticky-top'>
                    <div className='Menu_Shop'>
                           <div className='page_Dao'>DẠO</div>
                           <div className='page_AllSp'
                            onClick={()=>this.OnclickTatCaSanPham()}
                           >
                                TẤT CẢ SẢN PHẨM
                            </div>
                           <div className='page_AllGh'
                            
                           >TOÀN BỘ GIAN HÀNG</div>
                           <div className='page_Sale'>SALE</div>
                           <div className='page_Them'>THÊM</div> 
                    </div>
                </div>
                <div style={{height:"100px"}}></div>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        cuahangArr: state.cuahang.cuahangArr,
        sanphamtheocuahang: state.sanpham.sanphamtheocuahang,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCuaHang: (data) => dispatch(actions.getAllCuaHang(data)),
        getAllSanPhamTheoCuaHang: (idCuaHang) => dispatch(actions.getAllSanPhamTheoCuaHang(idCuaHang)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailStore));
