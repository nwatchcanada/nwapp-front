import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    STAFF_LIST_REQUEST, STAFF_LIST_FAILURE, STAFF_LIST_SUCCESS,
    STAFF_DETAIL_REQUEST, STAFF_DETAIL_FAILURE, STAFF_DETAIL_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_STAFF_LIST_API_ENDPOINT,
    WORKERY_STAFF_DETAIL_API_ENDPOINT,
    WORKERY_STAFF_ARCHIVE_API_OPERATION_ENDPOINT,
    NWAPP_STAFF_PROMOTE_OPERATION_API_ENDPOINT,
    NWAPP_STAFF_DEMOTE_OPERATION_API_ENDPOINT,
    WORKERY_STAFF_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT,
    WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullStaffList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffListRequest()
        );

        // console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_STAFF_LIST_API_ENDPOINT+"?page="+page+"&page_size="+sizePerPage;
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
                setStaffListSuccess(data)
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

                console.log("pullStaffList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffListFailure({
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

export function postStaffDetail(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_LIST_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function pullStaffDetail(slug, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_STAFF_DETAIL_API_ENDPOINT+slug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            console.log("pullStaffDetail | Success:", staff); // For debugging purposes.

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function putStaffContactDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}


export function putStaffAddressDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}


export function putStaffMetricsDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////

export function deleteStaffDetail(slug, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.delete(WORKERY_STAFF_DETAIL_API_ENDPOINT + slug).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                               OPERATIONS                                   //
////////////////////////////////////////////////////////////////////////////////

export function postStaffDeactivationDetail(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_ARCHIVE_API_OPERATION_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postStaffDeactivationDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}


export function postStaffPromoteOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(NWAPP_STAFF_PROMOTE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postStaffPromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}


export function postStaffDemoteOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(NWAPP_STAFF_DEMOTE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postStaffPromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}


export function postStaffAvatarCreateOrUpdateOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postStaffPromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setStaffListRequest = () => ({
    type: STAFF_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setStaffListFailure = (info) => ({
    type: STAFF_LIST_FAILURE,
    payload: info,
});


export const setStaffListSuccess = (info) => ({
    type: STAFF_LIST_SUCCESS,
    payload: info,
});


export const setStaffDetailRequest = () => ({
    type: STAFF_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setStaffDetailSuccess = staffDetail => ({
    type: STAFF_DETAIL_SUCCESS,
    payload: staffDetail,
});


export const setStaffDetailFailure = staffDetail => ({
    type: STAFF_DETAIL_FAILURE,
    payload: staffDetail,
});



////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getStaffReactSelectOptions(staffList=[], selectName="staff") {
    const staffOptions = [];
    const isNotProductionsEmpty = isEmpty(staffList) === false;
    if (isNotProductionsEmpty) {
        const results = staffList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let staff = results[i];
                staffOptions.push({
                    selectName: selectName,
                    value: staff.slug,
                    label: staff.fullName
                });
                // console.log(staff);
            }
        }
    }
    return staffOptions;
}
