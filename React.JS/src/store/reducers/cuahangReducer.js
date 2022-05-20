import actionTypes from '../actions/actionTypes';
const initialState = {
    cuahangArr: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CUAHANG_SUCCESS:
            state.cuahangArr = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_CUAHANG_FAILED:
            state.cuahangArr = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;