import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import QuanLyGiohang from '../containers/System/Giohang/QuanLyGiohang';
import Header from '../containers/Header/Header';
import { path } from '../utils'
class Giohang extends Component {
    render() {
        {/*  */}
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                    
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/giohang" component={QuanLyGiohang} />
                            </Switch>
                        </div>
                    </div>
            </React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Giohang);
