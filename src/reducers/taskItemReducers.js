import {
    TASK_ITEM_LIST_REQUEST,
    TASK_ITEM_LIST_FAILURE,
    TASK_ITEM_LIST_SUCCESS,
    TASK_ITEM_DETAIL_REQUEST,
    TASK_ITEM_DETAIL_FAILURE,
    TASK_ITEM_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const taskItemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const taskItemDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_ITEM_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
