import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import DetailSP from '../containers/Patient/SanPham/DetailSP.js'

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/login.js';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import Homepage from '../containers/Homepage/Homepage.js';
import Sanpham from '../routes/Sanpham';
import Danhmuc from '../routes/Danhmuc';
import Loaisp from '../routes/Loaisp';
import Giohang from '../routes/Giohang';
import LichSuDHKhach from '../routes/LichSuDHKhach'
import ChiTietGioHangKhach from '../routes/ChiTietGioHangKhach'
import CustomScrollbars from '../components/CustomScrollbars';
import DonHang from '../routes/Admin/DonHang';
import ChiTietDonHang from '../routes/Admin/ChiTietDonHang';
import TinTuc from '../routes/Khach/TinTuc';
import BaiViet from '../routes/Admin/BaiViet';
import ChiTietTinTuc from '../routes/Khach/ChiTietTinTuc';
import SanPham from '../routes/Khach/SanPham';
import DangKy from '../routes/Khach/DangKy';
import UngDung from './System/Khach/UngDung';
import manageCuaHang from './System/CuaHang/manageCuaHang';
import DetailStore from './Homepage/Detail/DetailStore';
import AllSanPhamMotCuaHang from '../containers/Homepage/Detail/AllSanPhamMotCuaHang';
import SanPhamTimKiem from './Patient/SanPham/SanPhamTimKiem';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{height:"100vh" , width: "100%"}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.SANPHAMMANAGE} component={userIsAuthenticated(Sanpham)} />
                                    <Route path={path.DANHMUC} component={userIsAuthenticated(Danhmuc)} />
                                    <Route path={path.LOAISP} component={userIsAuthenticated(Loaisp)} />
                                    <Route path={path.HOMEPAGE} component={(Homepage)} />
                                    <Route path={path.DETAIL_SP} exact component={userIsAuthenticated(DetailSP)}/>
                                    <Route path={path.GIOHANG} exact component={userIsAuthenticated(Giohang)}/>
                                    <Route path={path.LICHSUMUAHNAG} exact component={userIsAuthenticated(LichSuDHKhach)}/>
                                    <Route path={path.CHITIET} exact component={userIsAuthenticated(ChiTietGioHangKhach)}/>
                                    <Route path={path.TINTUC} exact component={TinTuc}/>
                                    <Route path={path.LICHSUMUAHNAGADMIN} exact component={userIsAuthenticated(DonHang)}/>
                                    <Route path={path.CHITIETADMIN} exact component={userIsAuthenticated(ChiTietDonHang)}/>
                                    <Route path={path.BAIVIET} exact component={userIsAuthenticated(BaiViet)}/>
                                    <Route path={path.CHITIETTINTUC} exact component={userIsAuthenticated(ChiTietTinTuc)}/>
                                    <Route path={path.SANPHAM} exact component={userIsAuthenticated(SanPham)}/>
                                    <Route path={path.DANGKY} exact component={DangKy}/>
                                    <Route path={path.UNGDUNG} exact component={UngDung}/>
                                    <Route path={path.CUAHANG} exact component={userIsAuthenticated(manageCuaHang)}/>
                                    <Route path={path.DETAILSTORE} exact component={DetailStore}/>
                                    <Route path={path.ALLSANPHAMMOTCUAHANG} exact component={userIsAuthenticated(AllSanPhamMotCuaHang)}/>
                                    <Route path={path.SANPHAMTIMKIEM} exact component={SanPhamTimKiem}/>
                                    {/* /sanpham/ */}

                                    


                                </Switch>
                            </CustomScrollbars>
                        </div>
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
{/* Same as */}
<ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);