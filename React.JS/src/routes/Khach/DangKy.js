import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import DangKy from '../../containers/System/DangKy/DangKy';
import Header from '../../containers/Header/Header';
import { path } from '../../utils'
class DangKyRouter extends Component {
    render() {
        {/*  */}
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                    
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/dangky/" component={DangKy} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DangKyRouter);
