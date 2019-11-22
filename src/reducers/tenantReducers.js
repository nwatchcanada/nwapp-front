import {
    TENANT_LIST_REQUEST, TENANT_LIST_FAILURE, TENANT_LIST_SUCCESS,
    TENANT_DETAIL_REQUEST, TENANT_DETAIL_FAILURE, TENANT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const tenantListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TENANT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TENANT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TENANT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const tenantDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TENANT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case TENANT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case TENANT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
