import {
    ITEM_COMMENT_LIST_REQUEST, ITEM_COMMENT_LIST_FAILURE, ITEM_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const itemCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ITEM_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ITEM_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ITEM_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
