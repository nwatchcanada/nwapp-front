import {
    RESOURCE_LIST_REQUEST, RESOURCE_LIST_FAILURE, RESOURCE_LIST_SUCCESS,
    RESOURCE_DETAIL_REQUEST, RESOURCE_DETAIL_FAILURE, RESOURCE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const resourceListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case RESOURCE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case RESOURCE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case RESOURCE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const resourceDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case RESOURCE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case RESOURCE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case RESOURCE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
