import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Ungdung.scss";
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
import { Link } from 'react-router-dom';

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

class Ungdung extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 3000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll:  1,
            initialSlide: 0,
            cssEase: "linear",
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-Ungdung'>
            
            <div className='section-content'>
                <div className='section-header'>
                    <span className='titleUD'>???NG D???NG Y??U TH??CH</span>
                    <Link to='/ungdung'>
                        <button className='btn-UD'>xem th??m</button>
                    </Link>
                </div>
                <div className='section-body'>
                <Slider {...settings}>
                    <div className='img-UD'>
                        <img src={imgBanner1}/>
                        <div className='title-text'>
                        <div className='avt'>
                            <img src={avtnen1}></img>
                        </div>
                        <div className='text'>
                        EA Sports FIFA Online 4 - T???a game b??ng ???? ?????nh cao
                        </div>
                        </div>
                        
                        
                    </div>
                    <div className='img-UD'>
                    <img src={imgBanner2}/>
                    <div className='title-text'>
                        <div className='avt'>
                            <img src={avtnen2}></img>
                        </div>
                    <div className='text'>
                    G???i r???ng Online - 7 vi??n ng???c r???ng: Game nh???p vai MMORPG
                    </div>
                    </div>
                    </div>
                    <div className='img-UD'>
                    <img src={imgBanner3}/>
                    <div className='title-text'>
                        <div className='avt'>
                            <img src={avtnen3}></img>
                        </div>
                    <div className='text'>
                    Zing MP3 - ???ng d???ng nghe nh???c tr???c tuy???n
                    </div>
                    </div>
                    </div>
                    <div className='img-UD'>
                    <img src={imgBanner4}/>
                    <div className='title-text'>
                        <div className='avt'>
                            <img src={avtnen4}></img>
                        </div>
                        <div className='text'>
                        PicsArt: ???ng d???ng t???o ???nh gh??p & ch???nh s???a ???nh chuy??n nghi???p
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ungdung);
