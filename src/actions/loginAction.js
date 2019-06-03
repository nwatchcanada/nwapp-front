import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { NWAPP_LOGIN_API_URL } from "../constants/api"
import { setAccessTokenInLocalStorage, setRefreshTokenInLocalStorage } from '../helpers/tokenUtility';


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

        // Create a new Axios instance.
        const customAxios = axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            }
        })

        customAxios.post(NWAPP_LOGIN_API_URL, {
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

            // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
            // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
            setAccessTokenInLocalStorage(profile.accessToken);
            setRefreshTokenInLocalStorage(profile.refreshToken);

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
