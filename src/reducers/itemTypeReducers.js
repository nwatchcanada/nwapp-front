import {
    ITEM_TYPE_LIST_REQUEST, ITEM_TYPE_LIST_FAILURE, ITEM_TYPE_LIST_SUCCESS,
    ITEM_TYPE_DETAIL_REQUEST, ITEM_TYPE_DETAIL_FAILURE, ITEM_TYPE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const itemTypeListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ITEM_TYPE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ITEM_TYPE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ITEM_TYPE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const itemTypeDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ITEM_TYPE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ITEM_TYPE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ITEM_TYPE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
