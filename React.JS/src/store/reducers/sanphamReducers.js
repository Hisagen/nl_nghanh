import actionTypes from '../actions/actionTypes';

const initialState = {
    sanphams: [],
    loaispArr: [],
    danhmucArr: [],
    loaispnew: [],
    giohangArr: [],
    trangthaiArr: [],
    donhangArr: [],
    chitietdonhangArr: [],
    yeuthichArr: [],
    tt: '',
    diachiArr: [],
    markdown: [],
    markdownone: [],
    // tìm
    sanphamArr: [], // tìm theo loại 
    sanphamtheocuahang: [],
    binhLuans: [],
    binhLuanAdmins: [],

    traLois: [],
    traLoiAdmins: [],
    timsanphamtheoLoaiThuoccuahang: [],
}

const sanphamReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_SANPHAM_SUCCESS: 
            state.sanphams = action.sanphams;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SANPHAM_FAILED:
            state.sanphams = [];
            return {
                ...state,
            }  
        case actionTypes.FETCH_ALL_LOAISANPHAM_START:
            let copyState = {...state};
            //console.log("copyState",copyState)
            //copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALL_LOAISANPHAM_SUCCESS:
            state.loaispArr = action.data;
            //console.log("check state.loaispArr",state.loaispArr)
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_LOAISANPHAM_FAILED:
            state.loaispArr = [];
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_DANHMUC_SUCCESS: 
            state.danhmucArr = action.danhmucArr;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SDANHMUC_FAILED:
            state.danhmucArr = [];
            return {
                ...state,
            }  
        case actionTypes.SEARCH_LOAISP_SUCCESS: 
            state.loaispnew = action.loaispnew;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_GIOHANGNEW_SUCCESS: 
            state.giohangArr = action.data;
            console.log("check state.giohangArr",state.giohangArr)
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_GIOHANGNEW_FAILED:
            state.giohangArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_ALL_TRANGTHAI_SUCCESS: 
            state.trangthaiArr = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TRANGTHAI_FAILED:
            state.trangthaiArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_ALL_DONHANG_SUCCESS: 
            state.donhangArr = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DONHANG_FAILED:
            state.trangthaiArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_ALL_CHITIETDONHANG_SUCCESS: 
            state.chitietdonhangArr = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_CHITIETDONHANG_FAILED:
            state.chitietdonhangArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_ALL_YEUTHICH_SUCCESS: 
            state.yeuthichArr = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_YEUTHICH_FAILED:
            state.chitietdonhangArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_TT_DH_SUCCESS: 
            state.tt = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_TT_DH_FAILED:
            state.tt = [];
            return {
                ...state,
            }
        case actionTypes.GET_DIACHIFROMUSER_SUCCESS: 
            state.diachiArr = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_DIACHIFROMUSER_FAILED:
            state.diachiArr = [];
            return {
                ...state,
            }  
        case actionTypes.GET_ALLMARKDOWN_SUCCESS: 
            state.markdown = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALLMARKDOWN_FAILED:
            state.markdown = [];
            return {
                ...state,
            } 
        case actionTypes.GET_ONEMARKDOWN_SUCCESS: 
            state.markdownone = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ONEMARKDOWN_FAILED:
            state.markdownone = [];
            return {
                ...state,
            }
        case actionTypes.SEARCH_SANPHAM_THEOLOAI_SUCCESS: 
            state.sanphamArr = action.data;
            return {
                ...state,
            }
        case actionTypes.SEARCH_SANPHAM_THEOLOAI_FAILED:
            state.sanphamArr = [];
            return {
                ...state,
            } 
        case actionTypes.FETCH_ALL_SANPHAM_THEO_CUAHANG_SUCCESS: 
            state.sanphamtheocuahang = action.sanphamtheocuahang;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SANPHAM_THEO_CUAHANG_FAILED:
            state.sanphamtheocuahang = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_SUCCESS: 
            state.timsanphamtheoLoaiThuoccuahang = action.timsanphamtheoLoaiThuoccuahang;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_FAILED:
            state.timsanphamtheoLoaiThuoccuahang = [];
            return {
                ...state,
            }    
            case actionTypes.GET_ALL_BINHLUAN_SUCCESS: 
            state.binhLuans = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_BINHLUAN_FAILED:
            state.binhLuans = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_BINHLUAN_ADMIN_SUCCESS: 
            state.binhLuanAdmins = action.data;
            return {
                ...state,
            }

        case actionTypes.GET_ALL_BINHLUAN_ADMIN_FAILED:
            state.binhLuanAdmins = [];
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TRALOI_SUCCESS: 
            state.traLois = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TRALOI_FAILED:
            state.traLois = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_TRALOI_ADMIN_SUCCESS: 
            state.traLoiAdmins = action.data;
            return {
                ...state,
            }

        case actionTypes.GET_ALL_TRALOI_ADMIN_FAILED:
            state.traLoiAdmins = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}


export default sanphamReducer;