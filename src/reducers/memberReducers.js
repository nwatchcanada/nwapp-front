import {
    MEMBER_LIST_REQUEST, MEMBER_LIST_FAILURE, MEMBER_LIST_SUCCESS,
    MEMBER_DETAIL_REQUEST, MEMBER_DETAIL_FAILURE, MEMBER_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const memberListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEMBER_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEMBER_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEMBER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const memberDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEMBER_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEMBER_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEMBER_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
