import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SPManage.scss';
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





class SPManage extends Component {

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
        hasOldData: false,
        }
    }

    buildDataInputSelect = (inputData) =>
    {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 )
        {
            inputData.map((item, index)=>
            {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language === LANGUAGES.VI ? labelVi: labelEn;
                object.value = item.id;
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
            // LSPId: 	data.LSPId,
        })
        //console.log("check state", this.state);
    }
    handleChangeSelect = async (selectedOption) => {
        console.log("check selectedOption",selectedOption.value)
        this.setState({ selectedOption });
        let res = await getInfoDetailSP(selectedOption.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown)
        {
            let markdown = res.data.Markdown
            console.log(`markdown:`, markdown);
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
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
        console.log(`res:`, res);
    };
    handleChangeDesc = (event) => {
    this.setState({
            description: event.target.value
        })
    };
    render() {
        let hasOldData = this.state
        //console.log("check state:",this.state)
        //console.log("check state",this.state)
        let arrUsers = this.state.userRedux;
        return (
            <div className='manage-sp-container'>
                <div className='manage-sp-title'> Tạo chi tiết sản phẩm</div> 
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn sản phẩm</label>
                        {/* <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listSP}
                        /> */}
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
        fetchAllSP: (id) => dispatch(actions.fetchAllSP()),
        saveDetailSP: (data) => dispatch(actions.saveDetailSP(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SPManage);
