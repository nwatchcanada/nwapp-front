import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from "../constants/actionTypes";
import {
    NWAPP_GET_PROFILE_API_URL,
    NWAPP_ACTIVATE_API_URL
} from "../constants/api";


export const setProfileRequest = () => ({
    type: PROFILE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProfileSuccess = profile => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});


export const setProfileFailure = profile => ({
    type: PROFILE_FAILURE,
    payload: profile,
});


export function pullProfile(user, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProfileRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            NWAPP_GET_PROFILE_API_URL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (errorResult) => { // ERROR
            // // console.log(errorResult);
            // alert("Error fetching latest profile");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProfileFailure({
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

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function postProfile(user, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProfileRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        axios.post(NWAPP_GET_PROFILE_API_URL, decamelizedData, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProfileSuccess(device)
            );
        }).catch( (errorResult) => {
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            // Run our failure callback function.
            failedCallback(errors);

            store.dispatch(
                setProfileFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}


export function postActivateProfile(accessCode, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProfileRequest()
        );

        axios.post(NWAPP_ACTIVATE_API_URL, {
            'pr_access_code': accessCode
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
                setProfileSuccess(profile)
            );

            successCallback(profile);

        }).catch( (errorResult) => {
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            store.dispatch(
                setProfileFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

            // Run our failure callback function.
            failedCallback(errors);

        }).then( () => {
            // Do nothing.
        });

    }
}
