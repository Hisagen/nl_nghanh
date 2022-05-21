import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../../utils";
import * as actions from "../../../../store/actions";
import './binhluan.scss';
import { withRouter } from 'react-router';

class BinhLuan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            binhLuanArr: [],
            sanPhamArr: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllSANPHAMStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.sanPhams !== this.props.sanPhams) {
            let arrBL = this.props.sanPhams
            this.setState({
                sanPhamArr: arrBL,
            })
        }
    }

    handleViewBinhLuanCT = (data) => {
        this.props.history.push(`/system/detailed-comment/${data.id}`);
    }

    render() {

        let { sanPhamArr } = this.state;
        return (
            <>
                <div className="title mt-3">
                    QUẢN LÝ BÌNH LUẬN
                </div>

                <div className="container mt-3">
                    <table id='TableManageUser'>
                        <tbody>
                            <tr>
                                <th>Mã Sản Phảm</th>
                                <th>Tên Sản phẩm</th>
                                <th>Ảnh Sản Phẩm</th>
                                <th>Chi Tiết</th>
                            </tr>

                            {sanPhamArr && sanPhamArr.length > 0 && sanPhamArr.map((item, index) => {
                                let imageBase64 = '';
                                if (item.avt) {
                                    imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                }
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ten_sp}</td>
                                        <td>{<img src={imageBase64} className="img-img"  alt=" " style={{width: "40px", height: "50px", background: "center center no-repeat", backgroundSize: "contain" }}/>}</td>
                                        <td onClick={() => this.handleViewBinhLuanCT(item)}>{item.trangThaiBL==1?<i className="fas fa-info-circle"  style={{fontSize: "20px", color: "red", cursor: "pointer"}}></i>:<i className="fas fa-info-circle"  style={{fontSize: "20px", color: "blue", cursor: "pointer"}}></i>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        sanPhams: state.sanpham.sanphams,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSANPHAMStart: () => dispatch(actions.fetchAllSANPHAMStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BinhLuan));
