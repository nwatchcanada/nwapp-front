import {
    HOW_HEAR_LIST_REQUEST, HOW_HEAR_LIST_FAILURE, HOW_HEAR_LIST_SUCCESS,
    HOW_HEAR_DETAIL_REQUEST, HOW_HEAR_DETAIL_FAILURE, HOW_HEAR_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const howHearListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case HOW_HEAR_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const howHearDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case HOW_HEAR_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
