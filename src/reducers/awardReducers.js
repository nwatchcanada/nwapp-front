import {
    AWARD_LIST_REQUEST,
    AWARD_LIST_FAILURE,
    AWARD_LIST_SUCCESS,
    AWARD_DETAIL_REQUEST,
    AWARD_DETAIL_FAILURE,
    AWARD_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const awardListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AWARD_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case AWARD_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case AWARD_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const awardDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AWARD_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case AWARD_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case AWARD_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
