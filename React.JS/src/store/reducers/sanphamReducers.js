import actionTypes from '../actions/actionTypes';

const initialState = {
    sanphams: [],
    loaispArr: [],
    danhmucArr: [],
    loaispnew: [],
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
        default:
            return state;
    }
}


export default sanphamReducer;