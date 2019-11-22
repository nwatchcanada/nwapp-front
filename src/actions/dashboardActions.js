import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { DASHBOARD_REQUEST, DASHBOARD_FAILURE, DASHBOARD_SUCCESS } from '../constants/actionTypes';
import getCustomAxios from '../helpers/customAxios';
import { NWAPP_DASHBOARD_API_ENDPOINT } from "../constants/api"


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Make the call to the web-service.
        customAxios.get(NWAPP_DASHBOARD_API_ENDPOINT).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data

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
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

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
