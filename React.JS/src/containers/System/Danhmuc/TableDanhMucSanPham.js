import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableDanhMucSanPham.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {

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
    handleDeleteDanhMuc = (danhmuc) =>
    {
        this.props.deleteDanhMuc(danhmuc.id);
    }
    handleEditDanhMuc = (danhmuc) =>
    {
        this.props.handleEditDanhMucFromParentKey(danhmuc)
    }
    render() {
        
        let arrDanhMuc = this.props.danhmucArr;
        
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                <tbody>
                         <tr>
                            <th>Id</th>
                            <th>Tên Danh Mục</th>
                            <th>Actions</th>
                        </tr>
                        {arrDanhMuc && arrDanhMuc.length > 0 && 
                            arrDanhMuc.map((item, index) =>{
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ten_dm}</td>                                        
                                        <td>
                                            <button onClick={() => this.handleEditDanhMuc(item)}
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
        danhmucArr: state.sanpham.danhmucArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDanhMucSTART: () => dispatch(actions.fetchAllDanhMucSTART()),
        deleteDanhMuc: (id) => dispatch(actions.deleteDanhMuc(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
