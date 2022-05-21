 import React, { Component } from 'react';

import { connect } from 'react-redux';

import './BanNerQC.scss'

import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';


import imgBanner1 from "../../../assets/images/nenQC/banner1.jpg";
import imgBanner2 from "../../../assets/images/nenQC/banner2.jpg";
import imgBanner3 from "../../../assets/images/nenQC/banner4.jpg";
import imgBanner4 from "../../../assets/images/nenQC/banner6.jpg";
import imgBanner5 from "../../../assets/images/nenQC/banner5.jpg";



class BanNerQC extends Component {

   
    
    render() {
        
        return(
            <div className='section-share section-QC'>
                <div className='section-content'>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                    <div className='img-customize'>
                        <img src={imgBanner1}/>
                        <h3>Nguyên Liệu Thủ công Cần Thơ</h3>
                    </div>
                    <div className='img-customize'>
                    <img src={imgBanner2}/>
                        <h3>shop đồ handmade được yêu thích ở Cần Thơ</h3>
                    </div>
                    <div className='img-customize'>
                    <img src={imgBanner3}/>
                        <h3>Shop uy tín Chất Lượng</h3>
                    </div>
                    <div className='img-customize'>
                    <img src={imgBanner4}/>
                        <h3>Đặt nhu cầu khách hàng lên hàng đầu</h3>
                    </div>
                    <div className='img-customize'>
                    <img src={imgBanner5}/>
                        <h3>SALE</h3>
                    </div>
                    </Slider>
                </div>
                
                </div>
            </div>
        );
        
    };

};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(

BanNerQC);
