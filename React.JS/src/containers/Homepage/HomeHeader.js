import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route} from 'react-router-dom';
import './HomeHeader.scss'
import logo1 from '../../assets/images/HISAGEN_VI.png'
// import { adminMenu, sanphamMenu } from '../../containers/Header/menuApp';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils';
import {changeLanguageApp} from '../../store/actions';
import {withRouter} from "react-router";
import * as actions from "../../store/actions";
import Giohang from '../../routes/Giohang';
import DetailSP from '../Patient/SanPham/DetailSP';
import { isEmpty } from 'lodash';
import { TimKiemSanPham } from '../../services/sanphamService'
import SanPham from '../Patient/SanPham/SanPham';
import img1 from '../../assets/images/DanhMuc/mot.jpg'
import img2 from '../../assets/images/DanhMuc/hai.jfif'
import img3 from '../../assets/images/DanhMuc/ba.jfif'
import img4 from '../../assets/images/DanhMuc/bon.jfif'

class 

HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ten_sp_sreach: '',
            mangSPSreach: [],
        }
    }

    changeLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language);
    }
    returnHome = () =>
    {
        this.props.history.push(`/home`)

    }
    returnManage = () =>
    {
        this.props.history.push(`/system`)
    }
    async  componentDidMount () {
        
        this.props.fetchAllYeuThichSTART()
    }
    handleOnclickXoa = (data) =>
    {
        // console.log("check data yêu thích", data)
        this.props.deleteYeuThich(data)
    }
    handleOnClickDetail = (sanpham) =>
    {
        // console.log("check sanpham id", sanpham)
        if(this.props.history)
        {
            this.props.history.push(`/detail_sp/${sanpham.id_sp}`)
            window.location.reload(false)
        }
    }
    onchangeInput = (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })  
    }
    onClickSearch() {
        console.log("check value 11111111111111111111111")
    }
    handleKeyDown = async (event) =>
    {
        let temp = ''
        if(event.key === "Enter" || event.code === 113)
        {
            temp = await TimKiemSanPham(this.state.ten_sp_sreach)
        }
        if(temp && temp.length>0)
        {
            this.setState({
                mangSPSreach: temp
            })
            this.props.history.push(`/sanpham-timkiem/${this.state.ten_sp_sreach}`);
            window.location.reload();
        }
        console.log("check temp", temp)
    }
    handleOnclickGioHang() 
    {
        this.props.history.push(`/giohang/${this.props.userInfo.id}`)
    }
    render() {
        
        console.log("check ten_sp_sreach", this.state.ten_sp_sreach);
        let userInfo = this.props.userInfo;
        let avt =''
        if(userInfo)
        {
            if (userInfo.avt) {
                avt = new Buffer(userInfo.avt, 'base64').toString('binary')  
            }
        }
        
            
        // console.log("check userInfo.avt", avt)
        let yeuthichArr = this.props.yeuthichArr
        let language = this.props.language;
        const {processLogout, isLoggedIn}  = this.props
        // console.log("isLoggedIn",this.props.isLoggedIn)
        return (
            <React.Fragment>
                 <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div  className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='Header-logo' src= {logo1} onClick={()=> this.returnHome()}/>
                        </div>
                        <div className='center-content'> 
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                    <input type='text' className='txt-search' placeholder="Tìm kiếm..." 
                                        onChange={(event)=>{this.onchangeInput(event, 'ten_sp_sreach')}}
                                        onKeyDown={(event) => this.handleKeyDown(event)}
                                        // onClick={()=>this.onClickSearch()}
                                    />
                                    {/* {this.state.mangSPSreach &&  this.state.mangSPSreach.length>0 &&
                                            <SanPham 
                                               sanphamSearch = {this.state.mangSPSreach} 
                                            />
                                    } */}
                            </div>                           
                            <div className='child-content'>
                                <div className='hieu-ung'>
                                    <Link to='/tintuc/'>
                                        <b><FormattedMessage id="homeheader.tintuc"/></b>
                                    </Link>
                                </div>
                                
                            </div>
                            <div className='child-content1'>
                            {/* <button className='mx-2 btn-section' onClick={() => this.handleDangNhap()}>{isLoggedInBN ? '' : 'Đăng Nhập'}</button> */}
                            <div className='hieu-ung'

                            onClick={()=>this.handleOnclickGioHang()}
                            >
                                {isLoggedIn ? 
                                    <b><FormattedMessage id="homeheader.giohang"/></b>       
                                : ""
                                }
                                                   
                            </div>                                
                            </div>
                            <div className='child-content2'>
                            <div className='hieu-ung'>
                                {isLoggedIn ? 
                                    <Link to='/lichsumuahang/'>
                                    <b><FormattedMessage id="homeheader.lsdh"/></b>            
                                    </Link>
                                    : ""
                                }
                                 
                            </div>
    
                            </div>
                            
                            
                            
                            <div className='child-whitelist'>
                            <span class="etsy-icon" title="Yêu Thích"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z"></path></svg></span>
                               
                               <div className='test'>
                                        <table id='tablespyt' className='text-center'>
                                            <tbody >
                                                <tr className='text-center'>
                                                   <th>STT</th>
                                                   <th>Tên</th>
                                                   <th>Hinh</th>
                                                   <th>Giá</th>
                                                   <th>Chi Tiết</th>
                                                   <th>Xóa</th>
                                                </tr>

                                                {yeuthichArr && yeuthichArr.length > 0 &&
                                                    yeuthichArr.map((item, index)=>{
                                                        {/* console.log("check id item yêu thích", item) */}
                                                        let imageBase64 =''
                                                        if (item.avt) {
                                                            imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                                        }
                                                        return (
                                                            
                                                            
                                                            <tr>    
                                                                <td>{index+1}</td>
                                                                <td>{item.ten_sp}</td>
                                                                <td><img src={imageBase64}/></td>
                                                                <td>{item.gia_sp.toLocaleString()}đ</td>
                                                                <td>
                                                                    <i className="fas fa-info" onClick={()=>this.handleOnClickDetail(item)}>

                                                                    </i>    
                                                                </td>
                                                                <td title='xóa sản phẩm khỏi yêu thích' ><i className="fas fa-minus-circle"
                                                                    onClick={()=> this.handleOnclickXoa(item)}
                                                                ></i></td>                                                                
                                                            </tr>
                                                           
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                               </div>
                            </div>
                            

                        </div>

                        <div className='right-content'>
                            {isLoggedIn ? 
                                    ''
                                :   <div className='dangnhap' >
                                    <div className='dangnhap1 mx-3'>
                                        <Link to='/login'>
                                        Đăng nhập
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to='/dangky/'>
                                        Đăng Ký
                                        </Link>  
                                    </div>
                                    </div>
                            }
                            <div className='support-content'>
                                <div><b><i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.hoidap"/></b></div>
                            </div>
                            
                            {isLoggedIn ? 
                                <span className='welcome'> <FormattedMessage id="homeheader.welcome"/>,&nbsp; {userInfo && userInfo.lastName ? userInfo.lastName: ''}</span>
                                : ""
                            }
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            {isLoggedIn ? 
                                <div className="btn btn-logout" onClick={processLogout} title="Log out">
                                    <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                :   ''
                            }
                            
                        </div>
                        
                        
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                    <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="homeheader.title1"/></div>
                        <div className='title2'>HISAGEN</div>
                        
                    </div>
                    <div className='content-dow'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <img src={img1}></img>
                            </div>
                            <div className='text-child'>Trang Sức & Phụ Kiện</div>
                        </div>
                        
                        <div className='option-child'>

                            <div className='icon-child'>
                            <img src={img2}></img>

                            </div>
                            <div className='text-child'>Quần Áo & Giày</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                            <img src={img3}></img>

                            </div>
                            <div className='text-child'>Đồ Chơi & Giải Trí</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                            <img src={img4}></img>

                            </div>
                            <div className='text-child'>Nghệ Thuật & Sưu Tầm</div>
                        </div>
                    </div>
                    </div>
                </div>
                }
            </React.Fragment>
           
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        yeuthichArr: state.sanpham.yeuthichArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchAllYeuThichSTART: () => dispatch(actions.fetchAllYeuThichSTART()),
        deleteYeuThich: (data) => dispatch(actions.deleteYeuThich(data)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
