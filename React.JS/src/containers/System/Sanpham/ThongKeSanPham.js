import { suppressDeprecationWarnings } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {get_all_san_pham, get_all_loai_san_pham} from "../../../services/sanphamService";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import {editSanPham} from "../../../store/actions/sanphamAction"
import "./ThongKeSanPham.scss"
import { FormattedMessage } from 'react-intl';
import TableSanPham from "./TableSanPham";
import Lightbox from 'react-image-lightbox';
import { isArrayLiteralExpression } from 'typescript';
import {thongkesanphamtheocuahang,
    thongkesanphamtheochitiet} from "../../../services/sanphamService"
import { isEmpty } from 'lodash';

////////////////////
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleLog } from 'd3-scale';
import { symbolCircle, symbol } from 'd3-shape';
import { formatPrefix } from 'd3-format';

import { ValueScale } from '@devexpress/dx-react-chart';

let data2 = [
//   { planet: 'Moon', mass: 0.073 },
//   { planet: 'Mercury', mass: 0.330 },
//   { planet: 'Mars', mass: 0.642},
//   { planet: 'Venus', mass: 4.87 },
//   { planet: 'Earth', mass: 5.97 },
    // { planet: 'Johanna Crossbody Bag', mass: 0.8 },
    // { planet: 'Toddler BUSY BOARD', mass: 4 },
    // { planet: 'Jupiter', mass: 4 },
    // { planet: '1', mass: 4 },
    // { planet: '2', mass: 4 },
    // { planet: '3', mass: 4 }

];

const Point = props => (
  <ScatterSeries.Point {...props} d={symbol().size([20 ** 2]).type(symbolCircle)()} />
);

const scale = () => scaleLog().base(2
    );
const modifyDomain = domain => [domain[0], 500];

const format = obj => obj.tickFormat(null, formatPrefix('.1', 1));

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    //console.log('handleEditorChange', html, text);
  }
  let i = 0;
  let t = 0;
class ThongKeSanPham extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            data: [
                
              ],
            data1: []
        }
    }

    async componentDidMount() {
    //      let mang1 = await thongkesanphamtheocuahang(this.props.userInfo.id);
    //    console.log('mang1',mang1)
         this.hamdata();
        
    }
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        
    }

    hamdata = async () => {
        
            let mang1 = await thongkesanphamtheocuahang(this.props.userInfo.id);
            // let mang2 = await thongkesanphamtheochitiet(this.props.userInfo.id);
            console.log('mang1',mang1)
            let m = []; 
            let tongsoluong = [];
            let chua = [];
            let chua1 = [];
            let soluong = +0;
            let long= +0
            // mang2.data && mang1.data.length > 0 &&
            // mang2.data.map((item, index) => {
                
            // })
            let tam = [];
            let chua2 = []
            let tam2 = '';
            let tensp = '';
            ////
            mang1.data && mang1.data.length > 0 &&
            mang1.data.map(async(item, index) => {
                long = await thongkesanphamtheochitiet(item.id,this.props.userInfo.id);
                console.log("longgggggggggggggggg",long)
               if(long.tongsoluong ===0){
                long.tongsoluong = 0.1
               }
               this.setState({
                    data1:
                    {
                        planet:  item.ten_sp,
                        mass: long.tongsoluong
                    },
                })
                this.state.data = this.state.data.concat(this.state.data1);
                console.log("this.state.data",this.state.data)
            })

                // this.setState({
                //     data: tam
                // })
            

            
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
    

    render() {
        console.log("this.state.data", this.state.data)
        const { data,data1 } = this.state;
        console.log("data", data[4])
        
                return (
            <React.Fragment>
                 <Paper>
        <Chart
          data={data}
        >
          <ValueScale factory={scale} modifyDomain={modifyDomain} />
          <ArgumentAxis />
          <ValueAxis
            tickFormat={format}
          />

          <ScatterSeries
            valueField='mass'
            argumentField='planet'
            pointComponent={Point}
          />
          <Title
            text="Thống kê số lượng sản phẩm (đã bán)"
          />
        </Chart>
      </Paper>
            </React.Fragment>          
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeSanPham);
