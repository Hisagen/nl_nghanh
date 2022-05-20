import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../../utils";
import * as actions from "../../../../store/actions";
import { getInfoDetailSanPham } from "../../../../services/sanphamService";
import { editActionBinhLuan } from "../../../../services/userService"
import './binhluan.scss';
import { withRouter } from 'react-router';
import ModelBinhLuanRep from './ModelBinhLuanRep';

class BinhLuanChiTiet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSP: '',
            spct: {},
            binhLuanArr: [],
            binhLuanAdminArr: [],
            isOpenModalUser: false,
            MaNguoiBL: {},
            traLoiArr: [],
        }
    }

    handleRep = async (data) => {
        console.log("data", data)
        if  (data) {
            await this.setState({
                isOpenModalUser: true,
                MaNguoiBL: data
            })
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.setState({
                idSP: this.props.match.params.id,
            })
        }
        
        let SPCT = await getInfoDetailSanPham(this.state.idSP)
        this.setState({
            spct: SPCT.data,
        })

        console.log("MaNguoiBinhLuan", this.state.MaNguoiBL)
        await this.props.handleGetAllBinhLuanAdmin(this.state.idSP);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.binhLuanAdmins !== this.props.binhLuanAdmins) {
            let arrBL = this.props.binhLuanAdmins
            this.setState({
                binhLuanAdminArr: arrBL,
            })
        }
    }

    handleActionBL = async (data) => {
        if (data.TrangThai == 0) {
            await editActionBinhLuan({
                tt: 1,
                idBL: data.id,
            })
        } else {
            await editActionBinhLuan({
                tt: 0,
                idBL: data.id,
            })
        }
        window.location.reload(true);
    }

    

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    render() {
        let { userInfo } = this.props
        let { spct, binhLuanAdminArr } = this.state;
        return (
            <>
                <ModelBinhLuanRep
                    isOpen={this.state.isOpenModalUser}
                    toggleFromOpen={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                    MaNguoiBLNE={this.state.MaNguoiBL}
                    userInfo = {userInfo}
                />
                <div className="container">
                    <div className="title">BÌNH LUẬN CỦA SẢN PHẨM {spct.ten_sp}</div>

                    <div className="content">
                        <table id='TableManageUser'>
                            <tbody>
                                <tr>
                                    <th>Mã Bình Luận</th>
                                    <th>Bình Luận</th>
                                    <th>Ảnh Bình Luận</th>
                                    <th>Trả Lời</th>
                                    <th>Bình Luận Mới</th>
                                    <th>Trạng Thái</th>
                                </tr>
                                
                                {binhLuanAdminArr && binhLuanAdminArr.length > 0 && binhLuanAdminArr.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anhBL) {
                                        imageBase64 = new Buffer(item.anhBL, 'base64').toString('binary')  
                                    }
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.NoiDungBL}</td>
                                            <td>{<img src={imageBase64} className="img-img"  alt=" " style={{width: "40px", height: "50px", background: "center center no-repeat", backgroundSize: "contain" }}/>}</td>
                                            <td>
                                                <button className="btn btn-primary px-3"
                                                    onClick={()=> this.handleRep(item)}
                                                >
                                                <i className="fas fa-plus"></i> Trả Lời
                                                </button>
                                            </td>
                                            <td>{item.TrangThaiBL == 1 ? <i className="fas fa-info-circle" style={{ fontSize: "20px", color: "red" }}></i> : ""}</td>
                                            <td style={{ fontSize: "20px" , cursor: "pointer" }} onClick={() => this.handleActionBL(item)} >{ item.TrangThai == 1 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i> }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        binhLuanAdmins: state.sanpham.binhLuanAdmins,
        userInfo: state.user.userInfo,
        // traLois: state.sanpham.traLoiAdmins,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        handleGetAllBinhLuanAdmin: (data) => dispatch(actions.handleGetAllBinhLuanAdmin(data)),
        // handleGetAllTraLoi: (data, ma) => dispatch(actions.handleGetAllTraLoi(data, ma))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BinhLuanChiTiet));
