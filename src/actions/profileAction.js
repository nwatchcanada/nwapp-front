import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from "../constants/actionTypes";
import {
    NWAPP_GET_PROFILE_API_URL,
    NWAPP_ACTIVATE_API_URL
} from "../constants/api";
import {
    getAccessTokenFromLocalStorage,
    setAccessTokenInLocalStorage,
    setRefreshTokenInLocalStorage,
    attachAxiosRefreshTokenHandler
} from '../helpers/tokenUtility';


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


export function pullProfile(successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProfileRequest()
        );

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // Run our Axios post.
        customAxios.get(
            NWAPP_GET_PROFILE_API_URL
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


export function postProfile(data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProfileRequest()
        );

        const accessToken = getAccessTokenFromLocalStorage();

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.post(NWAPP_GET_PROFILE_API_URL, decamelizedData).then( (successResult) => {

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
            // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
            setAccessTokenInLocalStorage(profile.accessToken);
            setRefreshTokenInLocalStorage(profile.refreshToken);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

            // Run our success callback function.
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
