import axios from 'axios';
import msgpack from 'msgpack-lite';

import { getAPIBaseURL } from '../helpers/urlUtility';
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../helpers/tokenUtility';


/**
 *  Function returns a custom `Axios` instance tailered to the `Mikaponics`
 *  API web-service for authenticated users.
 *
 *  Features:
 *  (1) Inform API to expect request encoded with `MessagePack` format.
 *  (2) Inform API we expect responses to be in `MessagePack` format.
 *  (3) Attach authorization bearer token.
 *  (4) Integrate automatic refresh token when token expires.
 */
export default function getCustomAxios() {
    // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
    const accessToken = getAccessTokenFromLocalStorage();

    // Create a new Axios instance using our oAuth 2.0 bearer token
    // and various other headers.
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Authorization': "Bearer " + accessToken.token,
            'Content-Type': 'application/msgpack;',
            'Accept': 'application/msgpack',
        },
        responseType: 'arraybuffer'
    });

    // Attach our Axios "refesh token" interceptor.
    attachAxiosRefreshTokenHandler(customAxios);

    // DEVELOPER NOTES:
    // (1) By setting the value to ``application/msgpack`` we are telling
    //     ``Django REST Framework`` to use our ``MessagePack`` library.
    // (2) Same as (1)
    // (3) We are telling ``Axios`` that the data returned from our server
    //     needs to be in ``arrayBuffer`` format so our ``msgpack-lite``
    //     library can decode it. Special thanks to the following link:
    //     https://blog.notabot.in/posts/how-to-use-protocol-buffers-with-rest

    // Return our custom Axios instance for our application.
    return customAxios;
}
