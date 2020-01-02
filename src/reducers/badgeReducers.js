import {
    BADGE_LIST_REQUEST,
    BADGE_LIST_FAILURE,
    BADGE_LIST_SUCCESS,
    BADGE_DETAIL_REQUEST,
    BADGE_DETAIL_FAILURE,
    BADGE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const badgeListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case BADGE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case BADGE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case BADGE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const badgeDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case BADGE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case BADGE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case BADGE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
