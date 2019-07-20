import React, { Component } from 'react';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';
import axios from 'axios';

import PrivacyComponent from "../../components/general/privacyComponent";


class PrivacyContainer extends Component {

    constructor(props) {
        super(props);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onGetAPICall = this.onGetAPICall.bind(this);
        this.onPostAPICall = this.onPostAPICall.bind(this);
    }

    componentDidMount() {
        // Start the page at the top of the page.
        window.scrollTo(0, 0);

        this.onGetAPICall();
        this.onPostAPICall();
    }


    onGetAPICall() {

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            // baseURL: getAPIBaseURL(),
            headers: {
                // 'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        })

        const aURL = process.env.REACT_APP_API_HOST+'/version';

        customAxios.get(aURL).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let data = camelizeKeys(responseData);

            // console.log("postLogin | successResponse:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onPostAPICall() {

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            // baseURL: getAPIBaseURL(),
            headers: {
                // 'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        })

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'name': "Frank Herbert"
        });

        const aURL = process.env.REACT_APP_API_HOST+'/hello';

        customAxios.post(aURL, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let data = camelizeKeys(responseData);

            console.log("SUCC:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => {
            console.log(exception);
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                console.log(">>", responseData); // For debugging purposes.

                let errors = camelizeKeys(responseData);
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onSuccessfulSubmissionCallback(data) {
        console.log(data);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    render() {
        // Return our GUI.
        return (
            <PrivacyComponent />
        );
    }
}

export default PrivacyContainer;
