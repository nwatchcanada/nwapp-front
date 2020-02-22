import {
    ITEM_LIST_REQUEST, ITEM_LIST_FAILURE, ITEM_LIST_SUCCESS,
    ITEM_DETAIL_REQUEST, ITEM_DETAIL_FAILURE, ITEM_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const itemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const itemDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ITEM_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ITEM_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ITEM_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
