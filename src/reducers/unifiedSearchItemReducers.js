import {
    UNIFIED_SEARCH_ITEM_LIST_REQUEST,
    UNIFIED_SEARCH_ITEM_LIST_FAILURE,
    UNIFIED_SEARCH_ITEM_LIST_SUCCESS
} from '../constants/actionTypes';


export const unifiedSearchItemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case UNIFIED_SEARCH_ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case UNIFIED_SEARCH_ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case UNIFIED_SEARCH_ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
