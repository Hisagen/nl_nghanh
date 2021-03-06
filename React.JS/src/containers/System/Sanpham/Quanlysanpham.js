import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {get_all_san_pham, get_all_loai_san_pham} from "../../../services/sanphamService";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import {editSanPham} from "../../../store/actions/sanphamAction"
import "./Quanlysanpham.scss"
import { FormattedMessage } from 'react-intl';
import TableSanPham from "./TableSanPham";
import Lightbox from 'react-image-lightbox';
import { isArrayLiteralExpression } from 'typescript';
import {getInfoDetailSanPham, searchLoaispService, getdsloaidm} from "../../../services/sanphamService"
import { isEmpty } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
class Quanlysanpham extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loaiSPArr : [],
            sanphamArr: [],
            statusArr: [],
            DMArr: [],
            id: '',
            ten_sp: '',
            qc_spHTML: '',
            qc_spMarkdown: '',
            sl_sp: '',
            trangthai: '',
            msadmin: '',
            ma_loaisp: '',
            trangthai: '',
            msadmin: '',


            ma_dm_dau: '',
            ma_dm: '',
            



            HDH: '',
            cameraSau: '',
            cameraTruoc: '',
            chip: '',
            ram: '',
            bonho: '',
            pin: '',
            gia: '',

            avt: [],
            avt1: '',
            avt2: '',
            avt3: '',
            previewImgURL: '',

            previewImgURL1: '',
            previewImgURL2: '',
            previewImgURL3: '',
            action: '',
            spEditId: '',
            isOpen: false,

        }
    }

    async componentDidMount() {

        // this.props.fetchAllLoaiSanPhamSTART();
        this.props.fetchStatusStart();
        this.props.fetchAllSANPHAMStart();
        this.props.fetchAllDanhMucSTART();

        this.props.searchLoaisp(11);
        //console.log("this.state.ma_dm",this.state.ma_dm)
        let res = await get_all_san_pham()
        
        if(res && res.errCode === 0)
        {
            let arrdanhmuc  = this.props.arrdanhmuc;

            this.setState({
                sanphamArr: res.data,
                ma_dm: arrdanhmuc && arrdanhmuc.length>0 ? arrdanhmuc[0].id: ''

            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.arrdanhmuc !== this.props.arrdanhmuc)
        {
            let arrdanhmuc  = this.props.arrdanhmuc;
            //console.log("check arrdanhmuc",arrdanhmuc)
            this.setState({
                DMArr: arrdanhmuc,
                ma_dm: arrdanhmuc && arrdanhmuc.length>0 ? arrdanhmuc[0].id: ''
            })
            //this.props.searchLoaisp(this.state.ma_dm)
        }

        // if(prevProps.loaispnew !== this.props.loaispnew)
        // {
        //     let loaispnew = this.props.loaispnew;
        //     this.setState({
        //         loaiSPArr: loaispnew,
        //         ma_loaisp: loaispnew && loaispnew.length>0 ? loaispnew[0].id : ''
        //     })
        // }
        
        
        if(prevProps.statusRedux !== this.props.statusRedux)
        {
            let arrStatus  = this.props.statusRedux;
            
            this.setState({
                statusArr: arrStatus,
                trangthai: arrStatus && arrStatus.length>0 ? arrStatus[0].keyMap: ''
            })
        }
        
        if(prevProps.listSanPham !== this.props.listSanPham)
        {
            let arrStatus = this.props.statusRedux
            let arrLoaisp = this.props.loaispnew
            this.setState({
                ten_sp: '',
                qc_spHTML: '',
                qc_spMarkdown: '',
                sl_sp: '',
                trangthai: '',
                ma_loaisp: arrLoaisp && arrLoaisp.length>0 ? arrLoaisp[0].id : '',
                trangthai: arrStatus && arrStatus.length>0 ? arrStatus[0].keyMap: '',
                manhinh: '',
                HDH: '',
                cameraSau: '',
                cameraTruoc: '',
                chip: '',
                ram: '',
                bonho: '',
                pin: '',
                gia: '',

                avt: '',
                avt1: '',
                avt2: '',
                avt3: '',

                previewImgURL: '',
                previewImgURL1: '',
                previewImgURL2: '',
                previewImgURL3: '',

                action: CRUD_ACTIONS.CREATE,        
                
            })
        }
    }
   
    onchangeInput = async (event, id) => {
        let copyState = {...this.state};

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }) 
        console.log("dsfsf",copyState)
        // this.props.searchLoaisp(this.state.ma_dm)
        // console.log("check this.state.ma_dm", this.state.ma_dm)
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['ten_sp','sl_sp','trangthai','gia'] //,
        //console.log("check arrCheck",arrCheck)
        for(let i=0; i<arrCheck.length; i++)
        {
            if(!this.state[arrCheck[i]])
            {
                isValid = false;
                alert("ch??a nh???p: "+arrCheck[i]);
                break;
            }
        }

        return isValid;
    }
    hanldeSaveSanPham = () =>
    {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        //console.log("click me",this.state);
        let {action} = this.state;
        let idAdmin = this.props.idAdmin.id;
        if(action === CRUD_ACTIONS.CREATE)
        {
            this.props.createNewSanPham({
                ten_sp: this.state.ten_sp,
                qc_spHTML: this.state.qc_spHTML,
                qc_spMarkdown: this.state.qc_spMarkdown,
                sl_sp: this.state.sl_sp,
                trangthai: this.state.trangthai,
               
                msadmin: idAdmin,
                ma_loaisp: this.state.ma_loaisp,
                trangthai: this.state.trangthai,
                gia: this.state.gia,

                action: CRUD_ACTIONS.CREATE,
                avt: this.state.avt,
                avt1: this.state.avt1,
                avt2: this.state.avt2,
                avt3: this.state.avt3,

                msadmin: idAdmin,
                ma_loaisp: this.state.ma_loaisp,
                trangthai: this.state.trangthai,
                action: CRUD_ACTIONS.CREATE,
                avt: this.state.avt,
                avt1: this.state.avt1,
                avt2: this.state.avt2,
                avt3: this.state.avt3,
            })
            window.location.reload();
            // this.props.edit
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            this.props.editSanPham({
                id: this.state.id,
                ten_sp: this.state.ten_sp,
                qc_spHTML: this.state.qc_spHTML,
                qc_spMarkdown: this.state.qc_spMarkdown,
                sl_sp: this.state.sl_sp,
                trangthai: this.state.trangthai,
                gia: this.state.gia,
                msadmin: idAdmin,
                ma_loaisp: this.state.ma_loaisp,
                trangthai: this.state.trangthai,
                //action: CRUD_ACTIONS.CREATE,
                avt: this.state.avt,
                avt1: this.state.avt1,
                avt2: this.state.avt2,
                avt3: this.state.avt3,
            })
            window.location.reload();

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState(
            {
                qc_spHTML: html,
                qc_spMarkdown: text,
            }
        )
    }
    
    handleEditSanPhamFromParent = async (sanpham) =>
    {
        let sp = await getInfoDetailSanPham(sanpham.id);
        this.state.id = sanpham.id;
        
        //console.log("check sp",sp)
        let hinhsp = sp.data.hinhsp;
        console.log("check hinhsp",hinhsp)
        let idAdmin = this.props.idAdmin.id;
        let imageBase64 = '';

        let imageBase641 = '';
        let imageBase642 = '';
        let imageBase643 = '';
        //console.log("check sanpham",sanpham);
        if(sanpham.avt)
        {
            imageBase64 = new Buffer(sanpham.avt, 'base64').toString('binary');
            //console.log("check imageBase64",imageBase64);
            imageBase641 = new Buffer(hinhsp.image1, 'base64').toString('binary');
            //console.log("check imageBase641",imageBase641);
            imageBase642 = new Buffer(hinhsp.image2, 'base64').toString('binary');

            imageBase643 = new Buffer(hinhsp.image3, 'base64').toString('binary');
        }
        
        this.setState({
            ten_sp: sanpham.ten_sp,
            qc_spHTML: sanpham.qc_spHTML,
            qc_spMarkdown: sanpham.qc_spMarkdown,
            sl_sp: sanpham.sl_sp,
            trangthai: sanpham.trangthai,
            manhinh: sanpham.manhinh,
            HDH: sanpham.HDH,
            cameraTruoc: sanpham.cameraTruoc,
            cameraSau: sanpham.cameraSau,
            ram: sanpham.ram,
            chip: sanpham.chip,
            pin: sanpham.pin,
            gia: sanpham.gia,
            bonho: sanpham.bonho,
            msadmin: idAdmin,
            ma_loaisp: sanpham.ma_loaisp,
            trangthai: sanpham.trangthai,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: imageBase64,
            id: sanpham.id,
            previewImgURL1: hinhsp.image1,
            previewImgURL2: hinhsp.image2,
            previewImgURL3: hinhsp.image3,
        })
    }
     handleOnchangeImage = async (event) =>
    {

        let data = event.target.files;
        let file = data[0];
        // console.log("check file", file);
        let file1 = data[1];
        // console.log("check file", file1);
        let file2 = data[2];
        // console.log("check file", file2);
        let file3 = data[3];
        // console.log("check file", file3);
        if(file && file1 && file2 && file3)
        {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            let base641 = await CommonUtils.getBase64(file1);
            let objectUrl1 = URL.createObjectURL(file1);
            let base642 = await CommonUtils.getBase64(file2);
            let objectUrl2 = URL.createObjectURL(file2);
            let base643 = await CommonUtils.getBase64(file3);
            let objectUrl3 = URL.createObjectURL(file3);
            this.setState({
                previewImgURL: objectUrl,
                avt: base64,
                previewImgURL1: objectUrl1,
                avt1: base641,
                previewImgURL2: objectUrl2,
                avt2: base642,
                previewImgURL3: objectUrl3,
                avt3: base643,
            })
            //console.log("check state m???i:", this.state)
        }
    }
    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    onClickdanhmuc = () =>
    {
        this.props.searchLoaisp(this.state.ma_dm);
    }

    render() {
        
        
        // let loaispnew = this.props.loaispnew;
        // console.log("check avt1",this.state.avt1)
        console.log("check loa??i sa??n ph????m: ", this.props.loaispnew)
        // console.log("check userInfo", this.props.userInfo.id)
        // let id = this.props.userInfo.id;
        let loai = this.props.loaispnew;
        let arrdanhmuc = this.state.DMArr;
        let status = this.state.statusArr
        let language = this.props.language
        let {ten_sp,
        qc_sp,
        sl_sp,
        trangthai,

        msadmin,
        ma_loaisp,
        ma_dm,
        gia,        
        } = this.state
        console.log("check state ", this.state)
        return (
            <React.Fragment>
                <div className='sanpham-redux-container'>
                    <div className='title my-5'>Qu???n l?? s???n ph???m</div>
                    <div className='sanpham-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                
                            <div className='col-4'>
                                    <label>Danh mu??c:</label>
                                        <select className='form-control loaisp' type="text"
                                            onChange={(event)=>{this.onchangeInput(event, 'ma_dm')}}    
                                            onClick={(event)=>{this.onClickdanhmuc()}}                                        
                                            value={ma_dm}
                                        >
                                        {arrdanhmuc && arrdanhmuc.length> 0 && 
                                            arrdanhmuc.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.id} >
                                                            {item.ten_dm}
                                                        </option>
                                                    )
                                                })
                                        }
                                        </select>
                                </div>

                                <div className='col-4'>
                                    <label>Lo???i s???n ph???m:</label>
                                        <select className='form-control loaisp' type="text"
                                            onChange={(event)=>{this.onchangeInput(event, 'ma_loaisp')}}
                                            value={ma_loaisp}
                                        >                                        
                                            {loai && loai.length> 0 && 
                                                loai.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.ten_loaisp}
                                                        </option>
                                                    )
                                                })
                                            }
                                        
                                        </select>
                                </div>

                                <div className='col-4'>
                                    <label>T??n s???n ph???m:</label>
                                    <input className='form-control namesp' type="text"
                                        value={ten_sp}
                                        onChange={(event)=>{this.onchangeInput(event, 'ten_sp')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-4'>
                                    <label>S??? l?????ng:</label>
                                    <input className='form-control slsp' type="text"
                                        value={sl_sp}
                                        onChange={(event)=>{this.onchangeInput(event, 'sl_sp')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-4'>
                                    <label>Tr???ng th??i:</label>
                                    <select className='form-control ttsp'
                                        onChange={(event)=>{this.onchangeInput(event, 'trangthai')}}
                                        value={trangthai}
                                    >
                                    {status && status.length> 0 && 
                                            status.map((item, index) =>{
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                    }
                                    </select>
                                </div>
                                
                                <div className='col-4 mt-4'>
                                    <label>Gia??:</label>
                                    <input className='form-control namesp' type="text"
                                        value={gia}
                                        onChange={(event)=>{this.onchangeInput(event, 'gia')}}
                                    ></input>
                                </div>
                                
                                
                                {/* A??NH */}
                                <div className='col-3 mt-5'>
                                    <label><FormattedMessage id="manage-user.avt"/></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                            
                                            multiple

                                        />
                                        <label className='labe-upload' htmlFor='previewImg'>T???i ???nh <i className="fas fa-upload"></i></label>
                                        <div className='preview-image' 
                                            style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                            onClick={() => this.openPreviewImage()}
                                        />
                                    </div>
                                </div>   
                                

                                <div className='col-3 mt-5'>
                                    <label><FormattedMessage id="manage-user.avt1"/></label>
                                    <div className='preview-img-container'>
                                        <div className='preview-image2' 
                                            style={{backgroundImage: `url(${this.state.previewImgURL1})`}}
                                            //onClick={() => this.openPreviewImage1()}
                                        />
                                    </div>
                                </div>                 
                                
                                <div className='col-3 mt-5'>
                                    <label><FormattedMessage id="manage-user.avt2"/></label>
                                    <div className='preview-img-container'>
                                        
                                        <div className='preview-image2' 
                                            style={{backgroundImage: `url(${this.state.previewImgURL2})`}}
                                            //onClick={() => this.openPreviewImage()}
                                        />
                                    </div>
                                </div>  

                                <div className='col-3 mt-5'>
                                    <label><FormattedMessage id="manage-user.avt3"/></label>
                                    <div className='preview-img-container'>
                                        
                                        <div className='preview-image2' 
                                            style={{backgroundImage: `url(${this.state.previewImgURL3})`}}
                                            //onClick={() => this.openPreviewImage()}
                                        />
                                    </div>
                                </div>  
                                <div className='col-12 mt-5'>
                                <label>Chi ti???t s???n ph???m:</label>
                                <div className='manage-sp-editor'>
                                    <MdEditor 
                                        style={{ height: '500px' }} 
                                        renderHTML={text => mdParser.render(text)} 
                                        onChange={this.handleEditorChange} 
                                        value={this.state.qc_spMarkdown}
                                        />
                                </div>
                                </div>
                                <div className='col-12 mt-3 btn-createSP'>
                                    <button
                                        onClick={()=> this.hanldeSaveSanPham()}
                                        >{this.state.action === CRUD_ACTIONS.EDIT ? 
                                        <span>L??u Th??ng Tin</span> : <span>T???o Th??ng Tin</span>
                                         }   
                                    </button>
                                </div>
                            </div>
                            <div className='col-12 mt-3 table-sanpham'>
                                    <TableSanPham
                                        handleEditSanPhamFromParentKey = {this.handleEditSanPhamFromParent}
                                        action = {this.state.action}
                                    />
                                </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                    />
                }
                {/* {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL1}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                    />
                } */}
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // userInfo: state.user.userInfo,
        // loaispnew: state.sanpham.loaispArr,
        statusRedux: state.admin.status,
        language: state.app.language,
        listSanPham: state.sanpham.sanphams,
        idAdmin: state.user.userInfo,
        arrdanhmuc: state.sanpham.danhmucArr,
        loaispnew: state.sanpham.loaispnew
    };
};

const mapDispatchToProps = dispatch => {
    
    return {  
        // fetchAllLoaiSanPhamSTART: () => dispatch(actions.fetchAllLoaiSanPhamSTART()),
        fetchStatusStart: () => dispatch(actions.fetchStatusStart()),
        createNewSanPham: (data) => dispatch(actions.createNewSanPham(data)),
        fetchAllSANPHAMStart: () => dispatch(actions.fetchAllSANPHAMStart()),
        editSanPham: (data) => dispatch(actions.editSanPham(data)),
        fetchAllDanhMucSTART: () => dispatch(actions.fetchAllDanhMucSTART()),
        searchLoaisp: (id) => dispatch(actions.searchLoaisp(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quanlysanpham);
