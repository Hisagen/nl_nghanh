import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
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




class TableManageUser extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            userRedux: [],

        }
    }
    componentDidMount () {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUser !== this.props.listUser)
        {
            this.setState({
                userRedux: this.props.listUser
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
        // console.log("check all user", this.props.listUser);
        // console.log("check state:", this.state.userRedux);
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                <tbody>
                         <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>Số Điện Thoại</th>
                            <th>address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && 
                            arrUsers.map((item, index) =>{
                                console.log("item", item.avt)
                                let imageBase64 =''
                                        if (item.avt) {
                                            imageBase64 = new Buffer(item.avt, 'base64').toString('binary')  
                                        }
                                        console.log("check imageBase64", imageBase64)
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
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
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
        fetchAllSP: (typeRole) => dispatch(actions.fetchAllSP(typeRole))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
