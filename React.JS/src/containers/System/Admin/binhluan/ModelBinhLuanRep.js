import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { emitter } from "../../../../utils/emitter";
import {createTraLoi } from "../../../../services/userService"
import _ from 'lodash';
import {toast} from 'react-toastify';

class ModalBinhLuanRep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rep: '',
            traLoiArr: [],
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.state = {
                rep: '',
                traLoiArr: [],
            }
        })
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.traLois !== this.props.traLois) {
            let arrBL = this.props.traLois
            this.setState({
                traLoiArr: arrBL,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromOpen()
    }

    handleOnChangInput = (event, ID) => {

        let copyState = { ...this.state };
        copyState[ID] = event.target.value;

        this.setState({
            ...copyState,
        })
        console.log("copyState",copyState)
    }

    handleAddRep = () => {
        let NguoiBL = this.props.MaNguoiBLNE
        let Info = this.props.userInfo
        createTraLoi({
            NoiDungTL: this.state.rep,
            MaBL: NguoiBL.id,
            MaSP: NguoiBL.MaSP,
            MaNguoiTL: Info.id,
            TrangThai: 1,
        });
        toast.success("Create a rep comment user success");
    }

    render() {
        let NguoiBL = this.props.MaNguoiBLNE
        let Info = this.props.userInfo
        console.log("NguoiBL", NguoiBL)
        console.log("Info", Info)

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Trả Lời Bình Luận</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Trả Lời</span>
                            </div>
                            <input type="text" onChange={(event) => { this.handleOnChangInput(event, "rep") }} class="form-control" placeholder="Nội Dung Trả Lời" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary" 
                        className="px-3"
                        onClick={() => { this.handleAddRep() }}
                    >Add new
                    </Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBinhLuanRep); 