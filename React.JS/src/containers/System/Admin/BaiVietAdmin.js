import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BaiVietAdmin.scss';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { fetchAllSP } from '../../../store/actions';
import {getInfoDetailSP} from "../../../services/userService"
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];



const mdParser = new MarkdownIt(/* Markdown-it options */);





class BaiVietAdmin extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
    //   contentHTML: DataTypes.TEXT('long'),
    //   contentMarkdown: DataTypes.TEXT('long'),
    //   description: DataTypes.TEXT('long'),
    //   SPId: DataTypes.INTEGER,
    //   LSPId: DataTypes.INTEGER,
    //   TTId: DataTypes.INTEGER,
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        selectedOption: '',
        listSP: '',
        avt: '',
        previewImgURL: '',
        hasOldData: false,
        }
    }

    buildDataInputSelect = (inputData) =>
    {
        // console.log("check inputData", inputData)
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 )
        {
            inputData.map((item, index)=>
            {
                let object = {};
                object.label = item.ten_sp;
                object.value = item.id;
                object.avt = item.avt;
                result.push(object); 
            })
            
        }
        return result

    }

    componentDidMount () {
        this.props.fetchAllSP();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allSP !== this.props.allSP)
        {
            let dataSelect = this.buildDataInputSelect(this.props.allSP)
            this.setState({
                listSP: dataSelect
            })
        }

        if(prevProps.language !== this.props.language)
        {
            let dataSelect = this.buildDataInputSelect(this.props.allSP)
            this.setState({
                listSP: dataSelect
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState(
            {
                contentHTML: html,
                contentMarkdown: text,
            }
        )
    }
    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state;
        this.props.saveDetailSP({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            SPId: this.state.selectedOption.value,
            avt: this.state.avt,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
            // LSPId: 	data.LSPId,
        })
        //console.log("check state", this.state);
    }
    handleChangeSelect = async (selectedOption) => {
        console.log("check selectedOption",selectedOption.value)
        this.setState({ selectedOption });
        let res = await getInfoDetailSP(selectedOption.value)
        console.log("check res", res)
        if(res && res.errCode === 0 && res.data && res.data.Markdown)
        {
            let markdown = res.data.Markdown
            if(markdown.avt)
            {
                markdown.avt = new Buffer(markdown.avt, 'base64').toString('binary');
                this.setState({
                    previewImgURL: markdown.avt,
                })
            }
            console.log(`markdown:`, markdown);
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                avt: markdown.avt,
                hasOldData: true
                //SPId: markdown.selectedOption.value,
            })
        }
        else
        {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
                //SPId:'',
            })
        }
        // console.log(`res:`, res);
    };
    handleChangeDesc = (event) => {
    this.setState({
            description: event.target.value
        })
    };
    handleOnchangeImage = async (event) =>
    {
        let data = event.target.files;
        let file = data[0];
        if(file)
        {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avt: base64
            })
            //console.log("check state mới:", this.state)
        }
    }
    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    } 
    render() {
        let hasOldData = this.state
        console.log("check state:",this.state)
        // console.log("check state contentHTML",this.state.contentHTML)
        // console.log("check state contentHTML",this.state.contentMarkdown)
        // console.log("check state contentHTML",this.state.description)
        let arrUsers = this.state.userRedux;
        return (
            <div className='manage-sp-container'>
                <div className='manage-sp-title'> Quản Lý Tin Tức Sản Phẩm</div> 
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn sản phẩm</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listSP}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu: </label>
                        <textarea className='form-control' rows="7"
                            onChange={(event)=> this.handleChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className='preview-img-container'>
                        Ảnh Đại Diện: 
                        <input id='previewImg' type='file' hidden
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                                <label className='labe-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className='preview-image' 
                                    style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={() => this.openPreviewImage()}
                                />
                    </div>
                <div className='manage-sp-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                        />
                </div>
                <button
                    onClick={()=> this.handleSaveContentMarkdown()}
                    className= {hasOldData.hasOldData === true ? 'save-content-SP' : 'create-content-SP'}>
                    {hasOldData.hasOldData === true ? 
                        <span>Lưu Thông Tin</span> : <span>Tạo Thông Tin</span>
                    }
                </button>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        allSP: state.admin.allSP,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchAllSP: () => dispatch(actions.fetchAllSP()),
        saveDetailSP: (data) => dispatch(actions.saveDetailSP(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaiVietAdmin);
