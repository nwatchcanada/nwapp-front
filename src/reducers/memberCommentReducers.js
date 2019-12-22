import {
    MEMBER_COMMENT_LIST_REQUEST, MEMBER_COMMENT_LIST_FAILURE, MEMBER_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const memberCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEMBER_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEMBER_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEMBER_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
