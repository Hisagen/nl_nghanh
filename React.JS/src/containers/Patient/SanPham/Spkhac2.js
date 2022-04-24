import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Spkhac2.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import imgBanner1 from "../../../assets/images/khac/lenovo_yoga.png";
import imgBanner2 from "../../../assets/images/khac/khac2.png";
import imgBanner3 from "../../../assets/images/khac/khac3.png";
import imgBanner4 from "../../../assets/images/khac/khac4.png";
import imgBanner5 from "../../../assets/images/khac/khac5.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

class Spkhac2 extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-share section-Spkhac2'>
            
            <div className='section-content'>
                <div className='section-header'>
                    <span className='title1'>SẢN PHẨM LIÊN QUAN</span>
                    <button className='btn-1'>xem thêm</button>
                </div>
                <div className='section-body'>
                <Slider {...settings}>
                    <div className='img-khac'>
                        <img src={imgBanner1}/>
                        <div className='nensp1'>
                           <h7>OPPO Reno7 Z 5G</h7>
                           <div>Hàng sắp về</div>
                           <div>9.000.000Đ</div>
                           <div>Tai nghe GALAXY ...</div>
                        </div>
                        
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner2}/>
                    <div className='nensp1'>
                        <h7>SAMSUMG GALAXY A52s 5G</h7>
                        <div>Hàng sắp về</div>
                           <div>9.000.000Đ</div>
                           <div>Tai nghe GALAXY ...</div>
                    </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner3}/>
                    <div className='nensp1'>
                            <h7>iPhone 13 Pro Max</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                    </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner4}/>
                        <div className='nensp1'>
                            <h7>OPPO Reno6 Z 5G</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                        </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner5}/>
                      <div className='nensp1'>
                            <h7>VIVO Y21s 6GB</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                           </div>
                    </div>
                    <div className='img-khac'>
                        <img src={imgBanner1}/>
                        <div className='nensp1'>
                           <h7>OPPO Reno7 Z 5G</h7>
                           <div>Hàng sắp về</div>
                           <div>9.000.000Đ</div>
                           <div>Tai nghe GALAXY ...</div>
                        </div>
                        
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner2}/>
                    <div className='nensp1'>
                        <h7>SAMSUMG GALAXY A52s 5G</h7>
                        <div>Hàng sắp về</div>
                           <div>9.000.000Đ</div>
                           <div>Tai nghe GALAXY ...</div>
                    </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner3}/>
                    <div className='nensp1'>
                            <h7>iPhone 13 Pro Max</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                    </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner4}/>
                        <div className='nensp1'>
                            <h7>OPPO Reno6 Z 5G</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                        </div>
                    </div>
                    <div className='img-khac'>
                    <img src={imgBanner5}/>
                      <div className='nensp1'>
                            <h7>VIVO Y21s 6GB</h7>
                            <div>Hàng sắp về</div>
                            <div>9.000.000Đ</div>
                            <div>Tai nghe GALAXY ...</div>
                           </div>
                    </div>
                    </Slider>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Spkhac2);
