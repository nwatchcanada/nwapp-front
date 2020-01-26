import {
    WATCH_LIST_REQUEST, WATCH_LIST_FAILURE, WATCH_LIST_SUCCESS,
    WATCH_DETAIL_REQUEST, WATCH_DETAIL_FAILURE, WATCH_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const watchListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case WATCH_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case WATCH_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case WATCH_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const watchDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case WATCH_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case WATCH_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case WATCH_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
