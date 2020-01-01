import {
    AREA_COORDINATOR_LIST_REQUEST, AREA_COORDINATOR_LIST_FAILURE, AREA_COORDINATOR_LIST_SUCCESS,
    AREA_COORDINATOR_DETAIL_REQUEST, AREA_COORDINATOR_DETAIL_FAILURE, AREA_COORDINATOR_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const areaCoordinatorListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AREA_COORDINATOR_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const areaCoordinatorDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AREA_COORDINATOR_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case AREA_COORDINATOR_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
