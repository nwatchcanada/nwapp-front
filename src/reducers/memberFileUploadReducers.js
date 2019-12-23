import {
    MEMBER_FILE_LIST_REQUEST,
    MEMBER_FILE_LIST_FAILURE,
    MEMBER_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const memberFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case MEMBER_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case MEMBER_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case MEMBER_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
