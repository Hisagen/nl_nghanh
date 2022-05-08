import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {LANGUAGES, USER_ROLE} from "../utils";
class Home extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;
        console.log("check userInfo", userInfo.typeRole)
        let linkToRedirect = ""
        if(userInfo.typeRole == USER_ROLE.CUSTOMER)
        {
            linkToRedirect = isLoggedIn ? '/home' :'/login'
        }
        else
        {
            if(userInfo.typeRole == USER_ROLE.ADMIN || userInfo.typeRole == USER_ROLE.MEMBER)
            {
                linkToRedirect = isLoggedIn ? '/system/user-manage' :'/login'
            }

        }
          //: '/login'; // /system/user-manage

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
