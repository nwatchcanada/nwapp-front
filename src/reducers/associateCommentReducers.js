import {
    ASSOCIATE_COMMENT_LIST_REQUEST, ASSOCIATE_COMMENT_LIST_FAILURE, ASSOCIATE_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const associateCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ASSOCIATE_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
