import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Avt.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import imgBanner1 from "../../../assets/images/Ungdung/ungdung11.png";
import imgBanner2 from "../../../assets/images/Ungdung/ungdung22.png";
import imgBanner3 from "../../../assets/images/Ungdung/ungdung33.png";
import imgBanner4 from "../../../assets/images/Ungdung/ungdung44.png";

import avtnen2 from "../../../assets/images/Ungdung/avtnen22.png"
import avtnen3 from "../../../assets/images/Ungdung/avtnen3.jpg"
import avtnen4 from "../../../assets/images/Ungdung/avtnen4.png"
import avtnen1 from "../../../assets/images/Ungdung/avtnen1.png"

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

class Avt extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-Avt'>
                
                
                <div className='section-body'>
                    <Slider {...settings}>
                        <div className='img-avt'>
                            <img src={this.props.img}/>
                        </div>
                        <div className='img-UD'>
                            <img src={this.props.img1}/>
                        </div>
                        <div className='img-UD'>
                            <img src={this.props.img2}/>
                        </div>
                        <div className='img-UD'>
                            <img src={this.props.img3}/>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Avt);
