import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    isLoadingGender: false,
    users: [],
    topDT: [],
    allSP: [],
    status: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        // ROLE    
        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }   
            
        //status
        case actionTypes.FETCH_STATUS_SUCCESS: 
            //state.isLoadingGender = false;
            state.status = action.status;
            //console.log("check state.status on adminReducers:",state.status)
            return {
                ...state,
            }
        case actionTypes.FETCH_STATUS_FAILED:
            //state.isLoadingGender = false;
            state.status = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            } 
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = action.users;
            return {
                ...state,
            } 
        case actionTypes.FETCH_TOP_DT_SUCCESS:
            state.topDT = action.dataDTs;
            return {
                ...state,
            }  
        case actionTypes.FETCH_TOP_DT_FAILED:
            state.topDT = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SP_SUCCESS:
            state.allSP = action.dataSPs;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DT_FAILED:
            state.allSP = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;