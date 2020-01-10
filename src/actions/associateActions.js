import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    ASSOCIATE_LIST_REQUEST, ASSOCIATE_LIST_FAILURE, ASSOCIATE_LIST_SUCCESS,
    ASSOCIATE_DETAIL_REQUEST, ASSOCIATE_DETAIL_FAILURE, ASSOCIATE_DETAIL_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_ASSOCIATE_LIST_API_ENDPOINT,
    WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT,
    WORKERY_ASSOCIATE_ARCHIVE_API_OPERATION_ENDPOINT,
    NWAPP_ASSOCIATE_PROMOTE_OPERATION_API_ENDPOINT,
    NWAPP_ASSOCIATE_DEMOTE_OPERATION_API_ENDPOINT,
    WORKERY_ASSOCIATE_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT,
    WORKERY_ASSOCIATE_CONTACT_UPDATE_API_ENDPOINT,
    WORKERY_ASSOCIATE_ADDRESS_UPDATE_API_ENDPOINT,
    WORKERY_ASSOCIATE_METRICS_UPDATE_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullAssociateList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAssociateListRequest()
        );

        // console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_ASSOCIATE_LIST_API_ENDPOINT+"?page="+page+"&page_size="+sizePerPage;
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
                setAssociateListSuccess(data)
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

                console.log("pullAssociateList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateListFailure({
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

export function postAssociateDetail(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_ASSOCIATE_LIST_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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

export function pullAssociateDetail(slug, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT+slug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            console.log("pullAssociateDetail | Success:", associate); // For debugging purposes.

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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

export function putAssociateContactDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_ASSOCIATE_CONTACT_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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


export function putAssociateAddressDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_ASSOCIATE_ADDRESS_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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


export function putAssociateMetricsDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_ASSOCIATE_METRICS_UPDATE_API_ENDPOINT.replace("XXX", data.slug), buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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

export function deleteAssociateDetail(slug, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.delete(WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT + slug).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putAssociateDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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

export function postAssociateDeactivationDetail(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_ASSOCIATE_ARCHIVE_API_OPERATION_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAssociateDeactivationDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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


export function postAssociatePromoteOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(NWAPP_ASSOCIATE_PROMOTE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAssociatePromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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


export function postAssociateDemoteOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(NWAPP_ASSOCIATE_DEMOTE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAssociatePromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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


export function postAssociateAvatarCreateOrUpdateOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_ASSOCIATE_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let associate = camelizeKeys(responseData);

            // Extra.
            associate['isAPIRequestRunning'] = false;
            associate['errors'] = {};

            // Update the global state of the application to store our
            // user associate for the application.
            store.dispatch(
                setAssociateDetailSuccess(associate)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(associate);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postAssociatePromoteOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateDetailFailure({
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

export const setAssociateListRequest = () => ({
    type: ASSOCIATE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setAssociateListFailure = (info) => ({
    type: ASSOCIATE_LIST_FAILURE,
    payload: info,
});


export const setAssociateListSuccess = (info) => ({
    type: ASSOCIATE_LIST_SUCCESS,
    payload: info,
});


export const setAssociateDetailRequest = () => ({
    type: ASSOCIATE_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setAssociateDetailSuccess = associateDetail => ({
    type: ASSOCIATE_DETAIL_SUCCESS,
    payload: associateDetail,
});


export const setAssociateDetailFailure = associateDetail => ({
    type: ASSOCIATE_DETAIL_FAILURE,
    payload: associateDetail,
});



////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAssociateReactSelectOptions(associateList=[], selectName="associate") {
    const associateOptions = [];
    const isNotProductionsEmpty = isEmpty(associateList) === false;
    if (isNotProductionsEmpty) {
        const results = associateList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let associate = results[i];
                associateOptions.push({
                    selectName: selectName,
                    value: associate.slug,
                    label: associate.fullName
                });
                // console.log(associate);
            }
        }
    }
    return associateOptions;
}
