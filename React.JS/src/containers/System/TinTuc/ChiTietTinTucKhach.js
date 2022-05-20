import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ChiTietTinTucKhach.scss';
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils, dateFormat} from "../../../utils";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {getInfoDetailSanPham} from "../../../services/sanphamService"
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from '../../Homepage/HomeFooter';
import NoiBac from '../../Homepage/Section/NoiBac';
import moment from 'moment';
import img1 from "../../../assets/images/TinTuc/galaxy-m53-2_1280x720-800-resize.jpg"
import { getAllMarkdownSerVice } from "../../../services/sanphamService"
// import ChiTietTinTucKhach from '../../Homepage/Section/ChiTietTinTucKhach';
const mdParser = new MarkdownIt(/* Markdown-it options */);
// import {deleteSanPham} from "../../../store/actions/sanphamAction"
// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}




class ChiTietTinTucKhach extends Component {

    constructor(props)
    {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            currentDate: '',
            detailTinTuc: ''
        }
    }
   async componentDidMount () {
       console.log("this.props.match.params.id",this.props.match.params.id)
        let detailTinTuc = await getAllMarkdownSerVice({
            id: this.props.match.params.id,
            limit: ''
        });
        this.setState({
            detailTinTuc: detailTinTuc.data
        })
        // this.state. = await 
        // console.log("detailTinTuc",detailTinTuc.data)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
    handleDeleteSanPham = (sanpham) =>
    {
    }
    // handleOnClick = (item) =>
    // {
    //     this.props.getOneMarkdown(item.SPId)
    //     console.log("check mardownOne", this.props.markdownone)
    // }
    render() {
        console.log("detailTinTuc",this.state.detailTinTuc)

       let markdownone = this.state.detailTinTuc
       let base64 = ''
       if(markdownone.avt)
       {
         base64 = new Buffer(markdownone.avt, 'base64').toString('binary');
       }
        return (
            <React.Fragment>
                <HomeHeader/>
                    <div className='ChiTietTinTucKhach-container'>
                        {/* <ChiTietTinTucKhach/> */}
                        <div className='left-right mb-5'>
                            <div className='title'>{markdownone.description}</div>
                            <div className='avt'>
                                <img src={base64}></img>
                            </div>
                            <div className='contentMarkdown mt-5 mb-5'
                                dangerouslySetInnerHTML ={{__html: markdownone.contentHTML}} 
                            >                                  
                            </div>
                        </div>
                        <NoiBac/>
                    </div>
                
                <HomeFooter/>
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        // markdownArr: state.sanpham.markdownArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getOneMarkdown: (data) => dispatch(actions.getAllMarkdown(data)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietTinTucKhach);
