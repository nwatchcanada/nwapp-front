import {
    EXPECTATION_LIST_REQUEST, EXPECTATION_LIST_FAILURE, EXPECTATION_LIST_SUCCESS,
    EXPECTATION_DETAIL_REQUEST, EXPECTATION_DETAIL_FAILURE, EXPECTATION_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const expectationListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case EXPECTATION_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case EXPECTATION_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case EXPECTATION_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const expectationDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case EXPECTATION_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case EXPECTATION_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case EXPECTATION_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
