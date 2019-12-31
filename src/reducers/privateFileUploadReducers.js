import {
    PRIVATE_FILE_UPLOAD_LIST_REQUEST,
    PRIVATE_FILE_UPLOAD_LIST_FAILURE,
    PRIVATE_FILE_UPLOAD_LIST_SUCCESS,
} from '../constants/actionTypes';


export const privateFileUploadListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRIVATE_FILE_UPLOAD_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_UPLOAD_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_UPLOAD_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
