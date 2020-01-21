import {
    ANNOUNCEMENT_LIST_REQUEST, ANNOUNCEMENT_LIST_FAILURE, ANNOUNCEMENT_LIST_SUCCESS,
    ANNOUNCEMENT_DETAIL_REQUEST, ANNOUNCEMENT_DETAIL_FAILURE, ANNOUNCEMENT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const announcementListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ANNOUNCEMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ANNOUNCEMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ANNOUNCEMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const announcementDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ANNOUNCEMENT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ANNOUNCEMENT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ANNOUNCEMENT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
