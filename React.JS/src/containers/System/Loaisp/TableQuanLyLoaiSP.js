import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableQuanLyLoaiSP.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableQuanLyLoaiSP extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            userRedux: [],

        }
    }
    
    componentDidMount () {
        this.props.fetchAllDanhMucSTART();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
    handleDeleteDanhMuc = (loaisp) =>
    {
        this.props.deleteLoaisp(loaisp.id)
    }
    handleLoaisp = (loaisp) =>
    {
        this.props.handleEditLoaispFromParentKey(loaisp)
    }
    render() {
        
        let arrDanhMuc = this.props.loaispArr;
        
        return (
            <React.Fragment>
                <table id='TableSanPham'>
                <tbody>
                         <tr>
                            <th>Id</th>
                            <th>Tên Loại Sản Phẩm</th>
                            <th>Actions</th>
                        </tr>
                        {arrDanhMuc && arrDanhMuc.length > 0 && 
                            arrDanhMuc.map((item, index) =>{
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ten_loaisp}</td>                                        
                                        <td>
                                            <button onClick={() => this.handleLoaisp(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteDanhMuc(item)}
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
        loaispArr: state.sanpham.loaispArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDanhMucSTART: () => dispatch(actions.fetchAllDanhMucSTART()),
        deleteLoaisp: (id) => dispatch(actions.deleteLoaisp(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableQuanLyLoaiSP);
