import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ChiTietDonHang from "../containers/System/DonHang/ChiTietDonHang"
import Header from '../containers/Header/Header';
class ChiTietGioHangKhach extends Component {
    render() {
        {/*  */}
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                    {isLoggedIn}
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/ChiTietGioHangKhach/:id_chitiet" component={ChiTietDonHang} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietGioHangKhach);
