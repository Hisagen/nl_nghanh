import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageCuaHang.scss';
import * as actions from "../../../store/actions";



import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}




class TableManageCuaHang extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            cuahangRedux: [],

        }
    }
    componentDidMount () {
        this.props.fetchcuahangRedux()
       this.props.getAllCuaHang('ALL');
       this.setState({
        cuahangRedux: this.props.cuahangArr
    })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.cuahangArr !== this.props.cuahangArr)
        {
            this.setState({
                cuahangRedux: this.props.cuahangArr
            })
        }
    }
    handleDeleteUser = (user) =>
    {
            this.props.deleteUser(user.id)
        }
    handleEditUser = (user) =>
        {
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        
        let arrUsers = this.state.cuahangRedux;
        console.log("check cuahangArr: ",this.props.cuahangArr)

        return (
            <React.Fragment>
                <table id='TableManageCuaHang'>
                <tbody>
                         <tr>
                            <th>Id</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Avatar</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>Số Điện Thoại</th>
                            <th>address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && 
                            arrUsers.map((item, index) =>{
                                {/* console.log("item", item.avt) */}
                                let imageBase64 =''
                                        if (item.avt) {
                                            imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                        }
                                        console.log("check item.cuahang.storeName", item.cuahang.storeName)
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.cuahang.storeName}</td>
                                        <td><img src={imageBase64}></img></td>
                                        
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.sdt}</td>
                                        <td>{item.address}</td>
                                        
                                        <td>
                                            <button onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className="fas fa-minus-circle"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                </tbody>
            </table>  
            
            {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        cuahangArr: state.cuahang.cuahangArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchcuahangRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
        fetchAllSP: (typeRole) => dispatch(actions.fetchAllSP(typeRole)),
        getAllCuaHang: (idCuaHang) => dispatch(actions.getAllCuaHang(idCuaHang))

        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCuaHang);
