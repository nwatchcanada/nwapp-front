import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { NWAPP_LOGIN_API_URL } from "../constants/api"


export const setLoginRequest = () => ({
    type: LOGIN_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setLoginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload: payload,
});


export const setLoginFailure = payload => ({
    type: LOGIN_FAILURE,
    payload: payload,
});


export function postLogin(email, password, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLoginRequest()
        );

        axios.post(NWAPP_LOGIN_API_URL, {
            'email': email,
            'password': password,
        }).then( (successResult) => {
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLoginSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (errorResult) => {
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            // Send our failure to the redux.
            store.dispatch(
                setLoginFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (failedCallback) {
                failedCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });

    }
}

export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
        isAPIRequestRunning: false,
        data: {},
        errors: {}
    },
});


export function postLogout() {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutSuccess()
        );
    }
}
