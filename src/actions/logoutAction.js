import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { NWAPP_LOGOUT_API_URL } from "../constants/api"


export const setLogoutRequest = () => ({
    type: LOGOUT_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
        isAPIRequestRunning: false,
        data: {},
        errors: {}
    },
});


export function attemptLogout() {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutSuccess()
        );
    }
}


export const setLogoutFailure = payload => ({
    type: LOGOUT_FAILURE,
    payload: payload,
});


export function postLogout(user) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutRequest()
        );

        attemptLogout();

        // Generate the URL.
        let aURL = NWAPP_LOGOUT_API_URL;

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token},
            crossDomain: true
        };

        const decamelizedData = {
            token: user.token
        }

        axios.post(aURL, decamelizedData, config).then( (successResult) => {
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLogoutSuccess()
            );

        }).catch( (errorResult) => {
            store.dispatch(
                setLogoutFailure({
                    isAPIRequestRunning: false,
                    errors: {
                        email: errorResult.response.data.email,
                        password: errorResult.response.data.password,
                        nonFieldErrors: errorResult.response.data.non_field_errors
                    }
                })
            );

        }).then( () => {
            // Do nothing.
        });
    }
}
