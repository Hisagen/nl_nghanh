import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UngDung.scss';
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils, dateFormat} from "../../../utils";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {getInfoDetailSanPham} from "../../../services/sanphamService"
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from '../../Homepage/HomeFooter';
// import img1 from "../../../assets/images/UngDung/thumb-mwg_1280x720-300x200.png"
import NoiBac from '../../Homepage/Section/NoiBac';
import moment from 'moment';
import {withRouter} from "react-router";
// import UngDung from '../../Homepage/Section/UngDung';
const mdParser = new MarkdownIt(/* Markdown-it options */);
// import {deleteSanPham} from "../../../store/actions/sanphamAction"
// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}




class UngDung extends Component {

    constructor(props)
    {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            currentDate: '',
        }
    }
   async componentDidMount () {
        this.props.getAllMarkdown("ALL");
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
    handleDeleteSanPham = (sanpham) =>
    {
    }
    handleOnClick = (item) =>
    {

        if(this.props.history)
        {
            this.props.history.push(`/ChiTietTinTuc/${item.SPId}`)
        }
    }
    render() {
       console.log("check markdownArr", this.props.markdownArr)
       let markdownArr = this.props.markdownArr
        return (
            <React.Fragment>
                <HomeHeader/>
                    <div className='ungdung-container'>
                        {/* <UngDung/> */}
                        <div className='title'>Tin Tức</div>
                        <div className='left-right mb-5'>
                            {markdownArr && markdownArr.length>0 &&
                                markdownArr.map((item, index)=>{
                                    let formatedDate = moment(item.createdAt).format(dateFormat.SEND_TO_SERVER)

                                    let base64 = ''
                                    if(item.avt)
                                    {
                                        base64 = new Buffer(item.avt, 'base64').toString('binary');
                                    }
                                    return (
                                       <div>
                                        <hr/>
                                        <div className='khung'
                                            onClick={()=> this.handleOnClick(item)}
                                        >
                                                <div className='avt'>
                                                    <img src={base64}></img>
                                                </div>
                                                <div className='title-ungdung'>
                                                   {item.description}
                                                <div className='timeCreate'>{formatedDate}</div>
                                                </div>
                                            </div>
                                        <hr/>
                                       </div>
                                        
                            
                                    )
                                })
                            }
                           
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
        markdownArr: state.sanpham.markdown,
        markdownone: state.sanpham.markdownone,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllMarkdown: (data) => dispatch(actions.getAllMarkdown(data)),
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UngDung));
