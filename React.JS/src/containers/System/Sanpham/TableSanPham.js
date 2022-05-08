import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableSanPham.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {getInfoDetailSanPham} from "../../../services/sanphamService"
const mdParser = new MarkdownIt(/* Markdown-it options */);
// import {deleteSanPham} from "../../../store/actions/sanphamAction"
// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}




class TableSanPham extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            SPRedux: [],
            detailSanPham : {}

        }
    }
   async componentDidMount () {
        this.props.fetchAllSANPHAMStart();
        //this.props.fetchAllLoaiSanPhamSTART();
        //let res = await getInfoDetailSanPham(6);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listSanPham !== this.props.listSanPham)
        {
            this.setState({
                SPRedux: this.props.listSanPham
            })
        }
    }
    handleDeleteSanPham = (sanpham) =>
    {
        this.props.deleteSanPham(sanpham.id)
    }
    handleEditUser = (sanpham) =>
    {
        
        this.props.handleEditSanPhamFromParentKey(sanpham)
    }
    render() {
        // console.log("check all user", this.props.listUser);
        //console.log("check SPRedux:", this.state.SPRedux);
        let arrSanPham = this.props.listSanPham;

        let arrLoaiSanPham = this.props.listLoaiSanPham;

        console.log("arrSanPham.avt",arrSanPham);
        // console.log("arrLoaiSanPham",arrLoaiSanPham);
        return (
            <React.Fragment>
                <table id='TableSanPham' className='text-center'>
                <tbody>

                         <tr className='text-center'>
                            <th>Id</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Hình Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Trạng Thái</th>
                            <th>Loại</th>
                            <th>Actions</th>
                        </tr>
                        {arrSanPham && arrSanPham.length > 0 && 
                            arrSanPham.map((item, index) =>{
                                let tenloai = ''
                                tenloai = getInfoDetailSanPham("1")
                                //console.log("check tenloai",tenloai)
                                let imageBase64 =''
                                    if (item.avt) {
                                        imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                    }
                                return (
                                    
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ten_sp}</td>
                                        <td><img src={imageBase64} className='img-img' style={{width: '50px', height: '50px'}}/>
                                        </td>
                                        <td>{item.sl_sp}</td>
                                        <td>{item.trangthai==="T1" ? <i className="fas fa-eye-slash"/> : <i className="fas fa-eye"/>}</td>
                                        <td>{item.loaisp.ten_loaisp}</td>
                                        <td>
                                            <button onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteSanPham(item)}
                                                className='btn-delete'><i className="fas fa-minus-circle"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                </tbody>
            </table>  
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        listSanPham: state.sanpham.sanphams,
        listLoaiSanPham: state.sanpham.loaispArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fetchAllLoaiSanPhamSTART: () => dispatch(actions.fetchAllLoaiSanPhamSTART()),
        fetchAllSANPHAMStart: () => dispatch(actions.fetchAllSANPHAMStart()),
        deleteSanPham: (id) => dispatch(actions.deleteSanPham(id)),
        //getInfoDetailSanPham: (id) => dispatch(actions.getInfoDetailSanPham(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSanPham);
