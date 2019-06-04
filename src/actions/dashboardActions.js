import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { DASHBOARD_REQUEST, DASHBOARD_FAILURE, DASHBOARD_SUCCESS } from '../constants/actionTypes';
// import { NWAPP_DASHBOARD_API_URL } from '../constants/api';
import {
    getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler
} from '../helpers/tokenUtility';


export const setDashboardRequest = () => ({
    type: DASHBOARD_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setDashboardFailure = (info) => ({
    type: DASHBOARD_FAILURE,
    payload: info,
});


export const setDashboardSuccess = (info) => ({
    type: DASHBOARD_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``dashboard`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullDashboard(schema, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setDashboardRequest()
        );

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        })

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // Generate the API endpoint to the web-service.
        const apiEndpintURL = process.env.REACT_APP_API_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + "/api/dashboard";

        // Make the call to the web-service.
        customAxios.get(
            apiEndpintURL
        ).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let dashboard = camelizeKeys(responseData);

            // Extra.
            dashboard['isAPIRequestRunning'] = false;
            dashboard['errors'] = {};

            // Update the global state of the application to store our
            // user dashboard for the application.
            store.dispatch(
                setDashboardSuccess(dashboard)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(dashboard);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setDashboardFailure({
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
