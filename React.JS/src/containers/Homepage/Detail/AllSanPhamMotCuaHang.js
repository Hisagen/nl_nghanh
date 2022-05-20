import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./AllSanPhamMotCuaHang.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from "../../../store/actions"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from '../../Homepage/HomeFooter';
import NoiBac from '../../Homepage/Section/NoiBac';
import {searchSanPhamtheoLoaiSerVice,TimsanphamtheoloaiThuocCuaHangService} from "../../../services/sanphamService"
import {withRouter} from "react-router";
class AllSanPhamMotCuaHang extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            ma_loaisp: 'ALL',
            sanphamArr: [],
        }
    }

   async componentDidMount()
    {
        await this.props.getAllSanPhamTheoCuaHang(this.props.match.params.idCuaHang);
        this.props.fetchAllLoaiSanPhamSTART();
        // let res = await searchSanPhamtheoLoaiSerVice("ALL");
        let sanphamtheocuahang = this.props.sanphamtheocuahang
        this.setState({
            sanphamArr: sanphamtheocuahang
        })
        // console.log("check res", res.data)

    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        // let sanphamArr = this.props.sanphamArr
        // if(prevProps.sanphamArr !== this.props.sanphamArr)
        // {
        //     this.setState({
        //         sanphamArr: sanphamArr,
        //     })
        // }
    }
    handleViewSanPhamNoiBac = (sanpham) =>
    {
        // console.log("View info Sản Phẩm:", sanpham);
        if(this.props.history)
        {
            this.props.history.push(`/detail_sp/${sanpham.id}`)
        }
        
    }
    onchangeInput = async (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }) 
        console.log("dsfsf",copyState)

    }

    onClickInputMaLoaiSP = async (event) =>
    {
        // this.props.searchSanPhamtheoLoai(this.state.ma_loaisp);
        let res = await TimsanphamtheoloaiThuocCuaHangService({
            idCuaHang: this.props.match.params.idCuaHang,
            idLoai : event.target.value
        })
        // console.log("check res TimsanphamtheoloaiThuocCuaHangService",res.data)
        this.setState({
            sanphamArr: res.data
        })
    }
    render() {
        // console.log("check sanphamtheocuahang", this.props.sanphamtheocuahang)
        let sanphamArr = this.state.sanphamArr
        let ma_loaisp = this.state.ma_loaisp
        let loai = this.props.loaispArr
        console.log("check sanphamArr", sanphamArr)
        
        return (
            <>
                <HomeHeader/>   
                <br/>
                <br/>
                <br/>
                <div className='left-right'>
                    <div className='title'>TẤT CẢ SẢN PHẨM</div>
                    <div className='sanpham-container mt-5'>
                        <div className='select-loai'>
                        <div className='col-3'>
                                    <label>Loại sản phẩm:</label>
                                        <select className='form-control loaisp' type="text"
                                            onChange={(event)=>{this.onchangeInput(event, 'ma_loaisp')}}
                                            onClick={(event)=>this.onClickInputMaLoaiSP(event)}
                                            value={ma_loaisp}
                                        >
                                                <option selected value={"ALL"}>
                                                    Tất Cả
                                                    </option>
                                            {loai && loai.length> 0 && 
                                                loai.map((item, index) =>{
                                                    
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.ten_loaisp}
                                                        </option>
                                                    )
                                                })
                                            }
                                        
                                        </select>
                                </div>  
                        </div>
                        <div className='row'>
                            {sanphamArr && sanphamArr.length>0 &&
                                sanphamArr.map((item, index)=>{
                                    let imageBase64 = ''
                                    if(item.avt)
                                    {
                                        imageBase64 = new Buffer(item.avt, 'base64').toString('binary');
                                    }
                                    return(
                                        <div className='col-3 mt-3 mb-5'
                                        onClick={() => this.handleViewSanPhamNoiBac(item)}
                                        >
                                            <div className='avt'>
                                                <img src={imageBase64}></img>
                                            </div>
                                            <div className='name mt-3'>{item.ten_sp}</div>
                                            <div className='gia'>{item.gia.toLocaleString()}đ</div>
                                            <ul>
                                                <li>Màn hình:{item.manhinh}</li>
                                                <li>RAM {item.ram}, ROM {item.bonho}</li>
                                                <li>Camera sau: {item.cameraSau}</li>
                                                <li>Camera trước: {item.cameraTruoc}</li>
                                                <li>Pin {item.pin}</li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
                <NoiBac/>
                <HomeFooter/>
            </>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        sanphamArr: state.sanpham.sanphamArr,
        loaispArr: state.sanpham.loaispArr,
        sanphamtheocuahang: state.sanpham.sanphamtheocuahang,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchSanPhamtheoLoai: (idLoai) =>dispatch(actions.searchSanPhamtheoLoai(idLoai)),
        fetchAllLoaiSanPhamSTART: () =>dispatch(actions.fetchAllLoaiSanPhamSTART()),
        getAllSanPhamTheoCuaHang: (idCuaHang) => dispatch(actions.getAllSanPhamTheoCuaHang(idCuaHang)),
        TimsanphamtheoloaiThuocCuaHang: (data) =>dispatch(actions.TimsanphamtheoloaiThuocCuaHang(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSanPhamMotCuaHang));
