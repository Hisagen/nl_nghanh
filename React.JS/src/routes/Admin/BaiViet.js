import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BaiVietAdmin from '../../containers/System/Admin/BaiVietAdmin';
import Header from '../../containers/Header/Header';
class BaiViet extends Component {
    render() {
        {/*  */}
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                    {isLoggedIn && <Header />}
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/baiviet/" component={BaiVietAdmin} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BaiViet);
