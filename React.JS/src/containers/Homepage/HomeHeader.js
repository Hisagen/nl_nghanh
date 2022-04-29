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
import Giohang from '../../routes/Giohang';
import DetailSP from '../Patient/SanPham/DetailSP';
class 

HomeHeader extends Component {

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
    render() {
        
        console.log("check userInfo", this.props.userInfo);
        let language = this.props.language;
        return (
            <React.Fragment>
                 <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div  className='left-content'>
                            <i class="fas fa-bars"></i>
                            <img className='Header-logo' src= {logo1} onClick={()=> this.returnHome()}/>
                        </div>
                        <div className='center-content'>                            
                            <div className='child-content'>
                                <div className='hieu-ung'>
                                    <b><FormattedMessage id="homeheader.tintuc"/></b>
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
                                        <table id='tablespyt' className='xtext-center'>
                                            <tbody >
                                                <tr className='text-center'>
                                                   <th>STT</th>
                                                   <th>Tên</th>
                                                   <th>Hinh</th>
                                                   <th>Số Lượng</th>
                                                   <th>Xóa</th>
                                                </tr>
                                                <tr>    
                                                    <td>1</td>
                                                    <td>Sản phẩm 1</td>
                                                    <td><img src={img1}/></td>
                                                    <td>2</td>
                                                    <td title='xóa sản phẩm khỏi yêu thích'><i className="fas fa-minus-circle"></i></td>
                                                </tr>
                                                <tr>    
                                                    <td>2</td>
                                                    <td>Sản phẩm 1</td>
                                                    <td><img src={img1}/></td>
                                                    <td>2</td>
                                                    <td title='xóa sản phẩm khỏi yêu thích'><i className="fas fa-minus-circle"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                               </div>
                            </div>
                            

                        </div>

                        <div className='right-content'>
                            <div className='support-content'>
                                <div><b><i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.hoidap"/></b></div>
                            </div>
                            
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                    <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="homeheader.title1"/></div>
                        <div className='title2'>HISAGEN</div>
                        <div className='search'>
                        <i class="fas fa-search"></i>
                            <input type='text' className='txt-search' placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                    <div className='content-dow'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                              <i class="fab fa-apple"></i>
                            </div>
                            <div className='text-child'>iPhone</div>
                        </div>
                        
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i class="fab fa-android"></i>
                            </div>
                            <div className='text-child'>ANDROID</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                            <i class="fas fa-laptop"></i>
                            </div>
                            <div className='text-child'>LAPTOP</div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'>
                              <i class="fas fa-tablet"></i>
                            </div>
                            <div className='text-child'>TABLET</div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
