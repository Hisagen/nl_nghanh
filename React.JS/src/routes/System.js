import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import SPManage from '../containers/System/Admin/SPManage';
import SanPhamRedux from "../containers/System/Admin/SanPhamRedux"
import BinhLuan from '../containers/System/Admin/binhluan/binhluan';
import BinhLuanChiTiet from '../containers/System/Admin/binhluan/binhluanchitiet'
class System extends Component {
    render() {
        {/*  */}
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                    {isLoggedIn && <Header />}
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/system/user-manage" component={UserManage} />
                                <Route path="/system/UserRedux" component={UserRedux} />
                                <Route path="/system/SP-manage" component={SPManage} />
                                <Route path="/system/sanpham" component={SanPhamRedux} />
                                <Route path="/system/manage-comment" component={BinhLuan} />
                                <Route path="/system/detailed-comment/:id" component={BinhLuanChiTiet} />
                                <Route component={() => { return (<Redirect to={'/system/user-manage'} />) }} /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
