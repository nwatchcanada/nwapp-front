import {
    AREA_COORDINATOR_COMMENT_LIST_REQUEST,
    AREA_COORDINATOR_COMMENT_LIST_FAILURE,
    AREA_COORDINATOR_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const areaCoordinatorCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AREA_COORDINATOR_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
