import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '../constants/actionTypes';


export const setFlashMessage = (typeOf, text) => ({
    type: SET_FLASH_MESSAGE,
    payload: {
        typeOf: typeOf,
        text: text
    },
});


export const clearFlashMessage = () => ({
    type: CLEAR_FLASH_MESSAGE,
    payload: null,
});
