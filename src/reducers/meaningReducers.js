import {
    MEANING_LIST_REQUEST, MEANING_LIST_FAILURE, MEANING_LIST_SUCCESS,
    MEANING_DETAIL_REQUEST, MEANING_DETAIL_FAILURE, MEANING_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const meaningListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEANING_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEANING_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEANING_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const meaningDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEANING_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEANING_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEANING_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
