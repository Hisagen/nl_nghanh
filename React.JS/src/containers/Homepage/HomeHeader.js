import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route} from 'react-router-dom';
import './HomeHeader.scss'
import logo1 from '../../assets/images/HISAGEN_VI.png'
// import { adminMenu, sanphamMenu } from '../../containers/Header/menuApp';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils';
import img1 from "../../assets/images/nenQC/nen1.jpg"
import {changeLanguageApp} from '../../store/actions';
import {withRouter} from "react-router";
import * as actions from "../../store/actions";
import Giohang from '../../routes/Giohang';
import DetailSP from '../Patient/SanPham/DetailSP';
class 

HomeHeader extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         processLogout: ''

    //     }
    // }

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
    render() {
        
        console.log("check userInfo", this.props.userInfo);
        let userInfo = this.props.userInfo;
        let avt =''
            if (userInfo.avt) {
                avt = new Buffer(userInfo.avt, 'base64').toString('binary')  
            }
        console.log("check userInfo.avt", avt)
        let yeuthichArr = this.props.yeuthichArr
        let language = this.props.language;
        const {processLogout}  = this.props
        return (
            <React.Fragment>
                 <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div  className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='Header-logo' src= {logo1} onClick={()=> this.returnHome()}/>
                        </div>
                        <div className='center-content'>                            
                            <div className='child-content'>
                                <div className='hieu-ung'>
                                    <Link to='/tintuc/'>
                                        <b><FormattedMessage id="homeheader.tintuc"/></b>
                                    </Link>
                                </div>
                                
                            </div>
                            <div className='child-content1'>
                            <div className='hieu-ung'>
                                <Link to='/giohang/'>
                                    <b><FormattedMessage id="homeheader.giohang"/></b>        
                                </Link>                   
                            </div>                                
                            </div>
                            <div className='child-content2'>
                            <div className='hieu-ung'>
                                <Link to='/lichsumuahang/'>
                                    <b><FormattedMessage id="homeheader.lsdh"/></b>            
                                </Link> 
                            </div>
    
                            </div>
                            <div className='child-whitelist'>
                               <b><FormattedMessage id="menu.admin.whitelist"/></b>
                               
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
                            <div className='support-content'>
                                <div><b><i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.hoidap"/></b></div>
                            </div>
                            <div className='avt'><img src={avt}></img></div>
                            <span className='welcome'> <FormattedMessage id="homeheader.welcome"/>,&nbsp; {userInfo && userInfo.lastName ? userInfo.lastName: ''}</span>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                        <div className="btn btn-logout" onClick={processLogout} title="Log out">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                    <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="homeheader.title1"/></div>
                        <div className='title2'>HISAGEN</div>
                        {/* <div className='search'>
                        <i className="fas fa-search"></i>
                            <input type='text' className='txt-search' placeholder="Tìm kiếm..." />
                        </div> */}
                    </div>
                    <div className='content-dow'>
                    {/* <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                              <i className="fab fa-apple"></i>
                            </div>
                            <div className='text-child'>iPhone</div>
                        </div>
                        
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fab fa-android"></i>
                            </div>
                            <div className='text-child'>ANDROID</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-laptop"></i>
                            </div>
                            <div className='text-child'>LAPTOP</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                              <i className="fas fa-tablet"></i>
                            </div>
                            <div className='text-child'>TABLET</div>
                        </div>
                    </div> */}
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
