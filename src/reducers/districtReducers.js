import {
    DISTRICT_LIST_REQUEST,
    DISTRICT_LIST_FAILURE,
    DISTRICT_LIST_SUCCESS,
    DISTRICT_DETAIL_REQUEST,
    DISTRICT_DETAIL_FAILURE,
    DISTRICT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const districtListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DISTRICT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case DISTRICT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case DISTRICT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const districtDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DISTRICT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case DISTRICT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case DISTRICT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
