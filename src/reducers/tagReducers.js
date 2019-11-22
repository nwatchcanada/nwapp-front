import {
    TAG_LIST_REQUEST, TAG_LIST_FAILURE, TAG_LIST_SUCCESS,
    TAG_DETAIL_REQUEST, TAG_DETAIL_FAILURE, TAG_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const tagListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TAG_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TAG_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const tagDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TAG_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case TAG_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case TAG_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
