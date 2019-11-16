import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { TENANT_LIST_REQUEST, TENANT_LIST_FAILURE, TENANT_LIST_SUCCESS } from '../constants/actionTypes';
// import { NWAPP_TENANT_LIST_API_URL } from '../constants/api';
import {
    getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler
} from '../helpers/tokenUtility';
import { getAPIBaseURL } from '../helpers/urlUtility';
import { NWAPP_TENANT_LIST_API_ENDPOINT } from "../constants/api"


export const setTenantListRequest = () => ({
    type: TENANT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setTenantListFailure = (info) => ({
    type: TENANT_LIST_FAILURE,
    payload: info,
});


export const setTenantListSuccess = (info) => ({
    type: TENANT_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``tenantList`` API endpoint and override our
 *  global application state for the 'tenantList'.
 */
export function pullTenantList(successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTenantListRequest()
        );

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        const aURL = NWAPP_TENANT_LIST_API_ENDPOINT+"?page=1"

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            baseURL: getAPIBaseURL(),
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;',
                'Accept': 'application/json',
            },
        })

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // Make the call to the web-service.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data

            let tenantList = camelizeKeys(responseData);

            // Extra.
            tenantList['isAPIRequestRunning'] = false;
            tenantList['errors'] = {};

            // Update the global state of the application to store our
            // user tenantList for the application.
            store.dispatch(
                setTenantListSuccess(tenantList)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(tenantList);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setTenantListFailure({
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
            }
        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
