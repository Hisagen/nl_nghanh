import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./NoiBac.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import imgBanner1 from "../../../assets/images/nenQC/nen11.png";
import imgBanner2 from "../../../assets/images/nenQC/nen22.png";
import imgBanner3 from "../../../assets/images/nenQC/nen33.png";
import imgBanner4 from "../../../assets/images/nenQC/nen44.png";
import imgBanner5 from "../../../assets/images/nenQC/nen55.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
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
  
class NoiBac extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arrDT : []
        }

    } 
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.topDTRedux !== this.props.topDTRedux)
        {
            this.setState({
                arrDT: this.props.topDTRedux
            })
        }
    }
    componentDidMount()
    {
        this.props.loadTopDTs()
    }

    // handleAfterChange = (index, dontAnimate) =>
    // {
    //     console.log('check channel', index);
    // }
    handleViewSanPhamNoiBac = (sanpham) =>
    {
        // console.log("View info Sản Phẩm:", sanpham);
        if(this.props.history)
        {
            this.props.history.push(`/detail_sp/${sanpham.id}`)
        }
        
    }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll:  1,
            //slickGoTo: this.handleAfterChange,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };
        //console.log("check topDTRedux", this.props.topDTRedux);
        let allDT = this.state.arrDT;
        // console.log("check allDT",allDT);
        let {language} = this.props; 
        //allDT = allDT.concat(allDT).concat(allDT);
        return (
            <div className='section-share section-NoiBac'>
            
            <div className='section-content'>
                <div className='section-header'>
                    <span className='title1'><FormattedMessage id="homePage.out-standing-DT"/></span>
                    <button className='btn-1'><FormattedMessage id="homePage.more-infor"/></button>
                </div>
                <div className='section-body'>
                    <div className='khung'>
                        <Slider {...settings}>
                        {allDT && allDT.length > 0 && 
                            
                            allDT.map((item, index) => {
                                let imageBase64 = '';
                                if(item.avt)
                                {
                                    imageBase64 = new Buffer(item.avt, 'base64').toString('binary');
                                }
                                
                                return (
                                    <div className='img-noibac ' key={index} onClick= {()=> this.handleViewSanPhamNoiBac(item)}>
                                        <img src={imageBase64}/>
                                        <div className='nensp1'>
                                        <div>{item.ten_sp}</div>
                                        <div>{item.gia.toLocaleString()} VNĐ</div>
                                        <div>Tai nghe GALAXY ...</div>
                                        </div>
                                        
                                    </div>
                                    
                                )
                            })
                            }
                        </Slider>
                    </div>
                </div>
                
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDTRedux: state.admin.topDT,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDTs: () => dispatch(actions.fetchTopDT()),
        //getGenderStart: () => dispatch(actions.fetchGenderStart()),
 
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoiBac));
