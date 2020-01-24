import {
    RESOURCE_ITEM_LIST_REQUEST, RESOURCE_ITEM_LIST_FAILURE, RESOURCE_ITEM_LIST_SUCCESS,
    RESOURCE_ITEM_DETAIL_REQUEST, RESOURCE_DETAIL_FAILURE, RESOURCE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const resourceListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case RESOURCE_ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case RESOURCE_ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case RESOURCE_ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const resourceDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case RESOURCE_ITEM_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case RESOURCE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case RESOURCE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
