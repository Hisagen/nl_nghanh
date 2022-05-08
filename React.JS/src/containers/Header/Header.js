import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, sanphamMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from "../../utils";
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount ()
    {
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role =  userInfo.typeRole
            if(role === USER_ROLE.ADMIN)
            {
                menu = adminMenu;

            }
            if(role === USER_ROLE.MEMBER)
            {
                menu = sanphamMenu;
            }
        }

        this.setState({
            menuApp:menu
        })
    }
    render() {
        const { processLogout ,language, userInfo} = this.props;
        console.log("chẹck userInfo",userInfo)
        console.log("check isLoggedIn", this.props.isLoggedIn)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='language'>
                    <span className='welcome'> <FormattedMessage id="homeheader.welcome"/>,&nbsp; {userInfo && userInfo.lastName ? userInfo.lastName: ''}</span>
                    <span 
                        className= {language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}  
                        onClick={() => this.handleChangLanguage(LANGUAGES.VI)}>
                        VN
                    </span>
                    <span 
                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} 
                        onClick={() => this.handleChangLanguage(LANGUAGES.EN)}>
                        EN
                    </span>
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                {/* nút logout */}
                
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
