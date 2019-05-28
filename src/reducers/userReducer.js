import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    PROFILE_REQUEST,
    PROFILE_FAILURE,
    PROFILE_SUCCESS,
    // SEND_PASSWORD_RESET_REQUEST,
    // SEND_PASSWORD_RESET_FAILURE,
    // SEND_PASSWORD_RESET_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
} from '../constants/actionTypes';


const userReducer = function(state = [], action = {}) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload);

        case LOGIN_FAILURE:
            return Object.assign({}, state, action.payload);

        case LOGIN_REQUEST:
            return Object.assign({}, state, action.payload);

        case LOGOUT_SUCCESS:
            return {}; // Note: Setting to empty dict clears the state.

        case LOGOUT_FAILURE:
            return Object.assign({}, state, action.payload);

        case LOGOUT_REQUEST:
            return Object.assign({}, state, action.payload);

        case REGISTER_REQUEST:
            return Object.assign({}, state, action.payload);

        case REGISTER_SUCCESS:
            return Object.assign({}, state, action.payload);

        case REGISTER_FAILURE:
            return Object.assign({}, state, action.payload);

        case PROFILE_REQUEST:
            return Object.assign({}, state, action.payload);

        case PROFILE_FAILURE:
            return Object.assign({}, state, action.payload);

        case PROFILE_SUCCESS:
            return Object.assign({}, state, action.payload);

        case RESET_PASSWORD_REQUEST:
            return Object.assign({}, state, action.payload);

        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, action.payload);

        case RESET_PASSWORD_FAILURE:
            return Object.assign({}, state, action.payload);

        default:
           return state;
    }
}

export default userReducer;
