import {
    STAFF_COMMENT_LIST_REQUEST, STAFF_COMMENT_LIST_FAILURE, STAFF_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const staffCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case STAFF_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case STAFF_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case STAFF_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
