import {
    STAFF_LIST_REQUEST, STAFF_LIST_FAILURE, STAFF_LIST_SUCCESS,
    STAFF_DETAIL_REQUEST, STAFF_DETAIL_FAILURE, STAFF_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const staffListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case STAFF_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case STAFF_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case STAFF_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const staffDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case STAFF_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case STAFF_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case STAFF_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
