import {
    ASSOCIATE_LIST_REQUEST, ASSOCIATE_LIST_FAILURE, ASSOCIATE_LIST_SUCCESS,
    ASSOCIATE_DETAIL_REQUEST, ASSOCIATE_DETAIL_FAILURE, ASSOCIATE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const associateListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ASSOCIATE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const associateDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ASSOCIATE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
