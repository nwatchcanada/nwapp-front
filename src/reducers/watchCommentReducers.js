import {
    WATCH_COMMENT_LIST_REQUEST, WATCH_COMMENT_LIST_FAILURE, WATCH_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const watchCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case WATCH_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case WATCH_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case WATCH_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
