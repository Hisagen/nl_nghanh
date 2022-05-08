import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./HomeFooter.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import oppo from "../../assets/images/logo/oppo.png";
import iphone from "../../assets/images/logo/iphone.png";
import samsum from "../../assets/images/logo/samsum.png";
import vivo from "../../assets/images/logo/vivo.png";
import realme from "../../assets/images/logo/realme.png";
import xiaomi from "../../assets/images/logo/xiaomi.png";
import nokia from "../../assets/images/logo/nokia.png";
import vmarkt from "../../assets/images/logo/vmarkt.png";

import thongbao from "../../assets/images/logo2/thongbao.png";
import logo3 from "../../assets/images/logo2/logo3.png";
import DMCA from "../../assets/images/logo2/DMCA.png";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

class HomeFooter extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-share section-HomeFooter'>
              <div className='khung'>
                <div className='col-1'>
                  <div className='ls'>Lịch Sử Mua Hàng</div>
                  <div className='ct'>Cộng Tác Bán Hàng Cùng HISAGEN</div>
                  <div className='csbm'>Chính Sách Bảo Mật</div>
                  <div className='csbh'>Chính Sách Bảo Hành</div>
                  <div className='xemthem'>Xem Thêm</div>
                </div>
                <div className='col-2'>
                  <div className='GT'>Giới Thiệu Công Ty</div>
                  <div className='TD'>Tuyển Dụng</div>
                  <div className='Gui'>Gửi Góp Ý, Kiếu Nại</div>
                  <div className='TimST'>Tìm Siêu Thị</div>
                  <div className='XemMB'>Xem Bản Mobile</div>
                </div>
                <div className='col-3'>
                  <div className='ls'><i>Tổng Đài Hỗ Trợ</i></div>
                  <div className='ct'>Gọi mua: <a href="#">1800.2323</a> (7:30-22:00)</div>
                  <div className='csbm'>Gọi mua: <a href="#">1800.2323</a> (7:30-22:00)</div>
                  <div className='csbh'>Gọi mua: <a href="#">1800.2323</a> (7:30-22:00)</div>
                  <div className='xemthem'>Bảo hành: <a href="#">1800.2323</a> (7:30-22:00)</div>
                </div>
                <div className='col-4'>
                  <div className='col-4-1'>
                      <div className='tren'>
                        <div className='icon'><i className="fab fa-facebook"></i></div>
                        <div className='tt'>300k Fan</div>
                        <div className='icon'><i className="fab fa-youtube"></i></div>
                        <div className='tt'>838k Đăng ký</div>
                      </div>
                      <div className='duoi'>
                        <div className='col-1'><img src={thongbao}/></div>
                        <div className='col-2'><img src={logo3}/></div>
                        <div className='col-3'><img src={DMCA}/></div>
                      </div>
                  </div>
                  <div className='col-4-2'>
                    <p>Nhãn Hàng</p>
                    <div className='tren'>
                      <div className='ip'><img src={oppo}/></div>
                      <div className='op'><img src={iphone}/></div>
                      <div className='sa'><img src={samsum}/></div>
                      <div className='vivo'><img src={vivo}/></div>
                    </div>
                    
                    <div className='duoi'>
                    <div className='xi'><img src={xiaomi}/></div>
                      <div className='re'><img src={realme}/></div>
                      <div className='no'><img src={nokia}/></div>
                      <div className='vi'><img src={vmarkt}/></div>
                    </div>
                    

                  </div>
                </div>
              </div>
              <div className='title-footer'>
                <br/>
                <br/>
                <hr/>
                <p>&copy; 2022 Nguyễn Ra Sin</p>
              </div>
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
