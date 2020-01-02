import {
    SCORE_POINT_LIST_REQUEST,
    SCORE_POINT_LIST_FAILURE,
    SCORE_POINT_LIST_SUCCESS,
    SCORE_POINT_DETAIL_REQUEST,
    SCORE_POINT_DETAIL_FAILURE,
    SCORE_POINT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const scorePointListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SCORE_POINT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case SCORE_POINT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case SCORE_POINT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const scorePointDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SCORE_POINT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case SCORE_POINT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case SCORE_POINT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
