import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Handbook.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import Ungdung from './Ungdung';
import { Link } from 'react-router-dom';
import * as actions from "../../../store/actions";
import { getAllMarkdownSerVice } from "../../../services/sanphamService"
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

class Handbook extends Component {

  constructor(props)
    {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            currentDate: '',
            tintucFirst: '',
            imgtintucFirst: '',
        }
    }
  async componentDidMount () {
    this.props.getAllMarkdown({
      id: "ALL",
      limit: 5
  });
    let tintucFirst = await getAllMarkdownSerVice({
      id: 15,
      limit: ''
    })

    this.setState({
      tintucFirst: tintucFirst.data,
      imgtintucFirst: tintucFirst.data.avt,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
        
  }
  handleOnClick = (item) =>
    {
      this.props.history.push(`/ChiTietTinTuc/${item.id}`)
    }
    render() {
          let markdownArr = this.props.markdownArr
          // let tintucFirst = markdownArr[6]
          let tintucFirst = this.state.tintucFirst
          console.log("check tintucFirst.id", tintucFirst.id)

          let imgtintucFirst = this.state.imgtintucFirst
          imgtintucFirst = new Buffer(imgtintucFirst, 'base64').toString('binary');
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
            <div className='Tong'>
                <div className='Handbook'>
                <div className='CN24h'>
                <div className='header-24h'>
                    <span className='title24h'>TIN TỨC</span>
                    <Link to='/tintuc/'>
                      <button className='btn-24h'>xem thêm</button>
                    </Link>
                </div>
                <div className='img-1'
                  onClick={()=> this.handleOnClick(tintucFirst)}
                
                >
                    <img src={imgtintucFirst}></img>
                </div>
                <div className='text'>
                {tintucFirst.description}
                </div>
                </div>
                <div className='CN24h-2'>
                    {markdownArr && markdownArr.length>0 &&
                      markdownArr.map((item,index)=>{
                        let imageBase64 = ''
                        if(item.avt)
                        {
                          imageBase64 = new Buffer(item.avt, 'base64').toString('binary');
                        }

                          return(
                          <div className='test1'>
                            <div className='img-2'
                              onClick={()=> this.handleOnClick(item)}
                            >
                                <img src={imageBase64}></img>
                            </div>
                            <div className='text-2'>
                              {item.description}
                            </div>
                          </div>
                        )
                      })
                      
                    }
                    
                    
                   
                </div>
            </div>
            <div className='Ungdung'>
                <Ungdung/>
            </div>
            </div>
            
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        markdownArr: state.sanpham.markdown,
        markdownone: state.sanpham.markdownone,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getAllMarkdown: (data) => dispatch(actions.getAllMarkdown(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
