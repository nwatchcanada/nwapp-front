import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '../constants/actionTypes';


const flashMessageReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SET_FLASH_MESSAGE:
            return Object.assign({}, state, action.payload);

        case CLEAR_FLASH_MESSAGE:
            return action.payload;

        default:
            return state;
    }
}

export default flashMessageReducer;
