import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Spkhac.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from "../../../store/actions";

import imgBanner1 from "../../../assets/images/khac/lenovo_yoga.png";
import imgBanner2 from "../../../assets/images/khac/khac2.png";
import imgBanner3 from "../../../assets/images/khac/khac3.png";
import imgBanner4 from "../../../assets/images/khac/khac4.png";
import imgBanner5 from "../../../assets/images/khac/khac5.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";

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
  
class Spkhac extends Component {
    async componentDidMount(){
        this.props.getAllCuaHang("ALL");
    }
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        
    }
    handleOnclickDetailStore (data)
    {
        this.props.history.push(`/detail-store/${data.id}`)
    }
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
        let cuahangArr = this.props.cuahangArr
        // console.log("check cuahangArr", this.props.cuahangArr)
        return (
            <div className='section-share section-Spkhac'>
            
            <div className='section-content'>
                <div className='section-header'>
                    <span className='title1'>CỬA HÀNG</span>
                    <button className='btn-1'>xem thêm</button>
                </div>
                <div className='section-body'>
                <Slider {...settings}>
                    {cuahangArr && cuahangArr.length > 0 &&
                        cuahangArr.map((item, index)=>{
                            let imageBase64 =''
                                        if (item.avt) {
                                            imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                        }
                            return(
                                <div className='img-khac'
                                onClick={()=>this.handleOnclickDetailStore(item)}
                                >
                                <img src={imageBase64}/>
                                {/* <div className='nensp1'>
                                <h7>OPPO Reno7 Z 5G</h7>
                                <div>Hàng sắp về</div>
                                <div>9.000.000Đ</div>
                                <div>Tai nghe GALAXY ...</div>
                                </div> */}
                                </div>
                            )
                            
                        })
                    }
                </Slider>
                </div>
                
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        cuahangArr: state.cuahang.cuahangArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCuaHang: (data) => dispatch(actions.getAllCuaHang(data)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Spkhac));
