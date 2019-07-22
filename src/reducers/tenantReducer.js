import { TENANT_LIST_REQUEST, TENANT_LIST_FAILURE, TENANT_LIST_SUCCESS } from '../constants/actionTypes';


const tenantListReducer = function(state = [], action = {}) {
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

export default tenantListReducer;
