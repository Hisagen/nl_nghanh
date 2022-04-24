//import { Modal } from "bootstrap";
import { ModalFooter, ModalHeader } from "reactstrap";

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';
import {Button, Modal, ModalBody} from 'reactstrap';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            ho: '',
            ten: '',
            diachi: '',
            sdt: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter = () =>
    {
        emitter.on("clear_model_data", () =>
        {
            this.setState({
                email: '',
                password: '',
                ho: '',
                ten: '',
                diachi: '',
                sdt: ''
            })
        })
    }
    componentDidMount() {
        console.log("did mount edit modal", this.props.currentUser);
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user))
        {
            this.setState({
                id: user.id,
                email: user.email,
                password: "user.password",
                ho: user.firstName,
                ten: user.lastName,
                diachi: user.address,

            })
        }

    }

    toggle = () =>
    {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) =>
    {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log(event.target.value ,id);
    }
    checkValidInput = () =>
    {
        let isValid = true;
        let arrInput = ['email','password', 'ho', 'ten', 'diachi'];
        for(let i=0; i< arrInput.length; i++)
        {
            if(!this.state[arrInput[i]])
            {
                isValid = false;
                alert("chưa nhập: " +arrInput[i]);
                break;
            }
        }
        console.log("check isValid", isValid)
        return isValid;
    }
    handleSaveUser = () =>
    {
        let isValid = this.checkValidInput();
        if(isValid === true)
        {
            // gọi api    
            this.props.editUser(this.state);
        }
        
    }
    render() {
        console.log("check props from parent", this.props);
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={"model-user-container"}
                size='lg'
                
                >
            <ModalHeader toggle={()=>{this.toggle()}}>Sửa user</ModalHeader>
            <ModalBody>
                    <div className="modal-user-body">
                    <div className="input-container">
                            <label>Email</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'email')}}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input 
                                type="password" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'password')}} 
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Họ</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'ho')}}
                                value={this.state.ho}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Tên</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'ten')}}
                                value={this.state.ten}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Địa chỉ</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'diachi')}}
                                value={this.state.diachi}
                            />
                        </div>
                        {/* <div className="input-container max-width-input">
                            <label>Số điện thoại</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event, 'sdt')}}
                                value={this.state.sdt}
                            />
                        </div> */}
                    </div>    

            </ModalBody>
            <ModalFooter>
                <button 
                    color="primary" 
                    className="px-3" 
                    onClick={()=>{this.handleSaveUser()}}>Save
                </button>{''}
                <button 
                    color="secondary" 
                    className="px-3" 
                    onClick={()=>{this.toggle()}}>Lose
                </button>
            </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

