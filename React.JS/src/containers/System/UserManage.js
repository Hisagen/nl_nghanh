import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './usersManaga.scss';
import {getAllUser, createNewUserService, deleteUserService, editUserService} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter';
import _ from 'lodash'; 
import { isCatchClause } from 'typescript';
class UserManage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {

            }
        }
    }
    /** Life cycle
     * Run component:
     * 1. Run construct -> init state
     * 2. Did mount (set state)
     * 3. Render
     */
    async componentDidMount() {
        let response = await getAllUser("ALL");
        if(response && response.errCode ===0)
        {
            console.log(response.users);
            this.setState({
                arrUsers: response.users,
                isOpenModalUser: false
            })
        }
    }

    handleAddNewUser = () =>
    {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () =>
    {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () =>
    {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    async componentDidMount()
    {
        await this.getAllUserFormReact();
    }

    getAllUserFormReact = async () =>
    {
        let response = await getAllUser("ALL");
        if(response && response.errCode ===0)
        {
            console.log(response.users);
            this.setState({
                arrUsers: response.users,
                isOpenModalUser: false
            })
        }
    }
    createNewUser = async (data) =>
    {
        try{
            let response = await createNewUserService(data);
            if(!response && response !== 0)
            {
                alert(response.errMessage)
            }
            else
            {
                alert(response.errMessage)
                await this.getAllUserFormReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit("clear_model_data")
            }
            
        }catch(e)
        {
            console.log(e);
        }
        
    }
    handleDeleteUser = async (user) =>
    {
        console.log("click delete", user);
        try{    
           let respon = await deleteUserService(user.id);
           if(respon && respon.errCode === 0)
           {
                await this.getAllUserFormReact();
           }
           else
           {
               
                alert(respon.errMessage)
           }
           console.log("check respon delete", respon)
        }catch(e)
        {
            console.log(e)
        }
    }
    handleEditUser = (user) =>
    {
        console.log("check user edit",user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) =>
    {
        try{
            let res = await editUserService(user);
            if(res && res.errCode === 0)
            {
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUserFormReact()
            }
            else
            {
                alert(res.errCode)
            }
        }catch(e)
        {
            console.log(e);
        }
        
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container pt-3">
            <ModalUser 
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
            ></ModalUser>
            {this.state.isOpenModalEditUser && 
            <ModalEditUser
                isOpen={this.state.isOpenModalEditUser}
                toggleFromParent={this.toggleEditUserModal}
                currentUser={this.state.userEdit}
                editUser={this.doEditUser}
            />
            }
            <div className='mx-1'>
                <button 
                    className='btn btn-primary px-3' onClick={ () => this.handleAddNewUser()}>
                    <i class="fas fa-plus"></i> Add new user

                </button>
            </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers" style={{width:'100%'}}>
                        <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Password</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>address</th>
                            <th>Actions</th>
                        </tr>
                        
                            {   arrUsers && arrUsers.map((item, index) =>{
                                return( 
                                    <tr>
                                    <td>{item.id}</td>
                                    <td>{item.password}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-minus-circle"></i></button>
                                    </td>
                                    </tr>
                                )
                            })

                            }
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
