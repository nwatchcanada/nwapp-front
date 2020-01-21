import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    ANNOUNCEMENT_LIST_REQUEST, ANNOUNCEMENT_LIST_FAILURE, ANNOUNCEMENT_LIST_SUCCESS,
    ANNOUNCEMENT_DETAIL_REQUEST, ANNOUNCEMENT_DETAIL_FAILURE, ANNOUNCEMENT_DETAIL_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_ANNOUNCEMENT_LIST_API_ENDPOINT, WORKERY_ANNOUNCEMENT_DETAIL_API_ENDPOINT } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullAnnouncementList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAnnouncementListRequest()
        );

        console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_ANNOUNCEMENT_LIST_API_ENDPOINT+"?page="+page+"&page_size="+sizePerPage;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            console.log(responseData); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setAnnouncementListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAnnouncementList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAnnouncementListFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                 CREATE                                     //
////////////////////////////////////////////////////////////////////////////////

export function postAnnouncement(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAnnouncementDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_ANNOUNCEMENT_LIST_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setAnnouncementDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAnnouncement | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAnnouncementDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function pullAnnouncement(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAnnouncementDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_ANNOUNCEMENT_DETAIL_API_ENDPOINT+id;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("pullAnnouncement | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setAnnouncementDetailSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAnnouncement | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAnnouncementDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                UPDATE                                      //
////////////////////////////////////////////////////////////////////////////////

export function putAnnouncement(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAnnouncementDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        const aURL = WORKERY_ANNOUNCEMENT_DETAIL_API_ENDPOINT+postData.id;
        console.log("URL:", aURL);

        // Perform our API submission.
        customAxios.put(aURL, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setAnnouncementDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putAnnouncement | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAnnouncementDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function deleteAnnouncement(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAnnouncementDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_ANNOUNCEMENT_DETAIL_API_ENDPOINT+id;

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("deleteAnnouncement | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setAnnouncementDetailSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log(" | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAnnouncementDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setAnnouncementListRequest = () => ({
    type: ANNOUNCEMENT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setAnnouncementListFailure = (info) => ({
    type: ANNOUNCEMENT_LIST_FAILURE,
    payload: info,
});


export const setAnnouncementListSuccess = (info) => ({
    type: ANNOUNCEMENT_LIST_SUCCESS,
    payload: info,
});


export const setAnnouncementDetailRequest = () => ({
    type: ANNOUNCEMENT_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setAnnouncementDetailSuccess = announcementDetail => ({
    type: ANNOUNCEMENT_DETAIL_SUCCESS,
    payload: announcementDetail,
});


export const setAnnouncementDetailFailure = announcementDetail => ({
    type: ANNOUNCEMENT_DETAIL_FAILURE,
    payload: announcementDetail,
});


////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAnnouncementReactSelectOptions(announcementList=[], selectName="announcement") {
    const announcementOptions = [];
    const isNotProductionsEmpty = isEmpty(announcementList) === false;
    if (isNotProductionsEmpty) {
        const results = announcementList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let announcement = results[i];
                announcementOptions.push({
                    selectName: selectName,
                    value: announcement.id,
                    label: announcement.text
                });
                // console.log(announcement);
            }
        }
    }
    return announcementOptions;
}


/**
 * Utlity function takes an array of `Announcement` primary keys and the `Announcements` results
 * from the API and returns the HTML dropdown selections which will be consumed
 * by the GUI powered by `react-select`.
 */
export function getPickedAnnouncementReactSelectOptions(announcementTargetsArray, announcementList=[], selectName="announcement") {
    const announcementOptions = [];
    if (isEmpty(announcementList) === false && isEmpty(announcementTargetsArray) === false) {
        const results = announcementList.results;
        const isResultsNotEmpty = results.length > 0;
        // console.log("getPickedAnnouncementReactSelectOptions | results:",results);
        // console.log("getPickedAnnouncementReactSelectOptions | isResultsNotEmpty:",isResultsNotEmpty);
        if (isResultsNotEmpty) {
            for (let i = 0; i < announcementTargetsArray.length; i++) {
                let announcementTarget = announcementTargetsArray[i];
                for (let j = 0; j < results.length; j++) {
                    let announcementSearch = results[j];
                    if (announcementSearch.id === announcementTarget.id) {
                        announcementOptions.push({
                            selectName: selectName,
                            value: announcementTarget.id,
                            label: announcementTarget.text
                        });
                        // console.log(announcementSearch);
                    } // end IF

                } //end FOR

            } // end FOR

        } // end IF
    }
    return announcementOptions;
}
