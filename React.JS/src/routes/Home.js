import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from "react-router";
import {LANGUAGES, USER_ROLE} from "../utils";
class Home extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;
        // console.log("check userInfo", userInfo.typeRole)
        let linkToRedirect = ""
        if(userInfo && isLoggedIn === true)
        {
            if(userInfo.typeRole == USER_ROLE.CUSTOMER)
            {
                linkToRedirect = '/home'
            }
            else
            {
                if(userInfo.typeRole == USER_ROLE.ADMIN)
                {
                    linkToRedirect = '/System/UserRedux'
                }
                else if(userInfo.typeRole == USER_ROLE.MEMBER)
                {
                    linkToRedirect = '/Sanpham/manage-sanpham'
                }
    
            }
        }
        // else
        // {
        //     linkToRedirect = '/home'
        // }
        
          //: '/login'; // /system/user-manage

        return (
            // this.props.history.push(linkToRedirect)

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
