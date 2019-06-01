import axios from 'axios';
import { camelizeKeys } from 'humps';
import { NWAPP_LOGIN_API_URL } from "../constants/api"

/**
 *------------------------------------------------------------------------------
 * The purpose of this utility is to handle all API token related functionality
 * and provide an interface for the system to use.
 *------------------------------------------------------------------------------
 */


/**
 *  Saves our access token to persistent storage.
 */
export function setAccessTokenInLocalStorage(accessToken) {
    localStorage.setItem("AT", JSON.stringify(accessToken));
}


/**
 *  Saves our refresh token to our persistent storage.
 */
export function setRefreshTokenInLocalStorage(accessToken) {
    localStorage.setItem("RT", JSON.stringify(accessToken));
}


/**
 *  Gets our access token from persistent storage.
 */
export function getAccessTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem("AT"));
}


/*
 *  Gets our refresh token from persisten storage.
 */
export function getRefreshTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem("RT"));
}


/**
 *  Function makes a call to our login API endpoint.
 */
function atteptLogin(email, password) {
    return axios.post(NWAPP_LOGIN_API_URL, {
        'email': email,
        'password': password,
    })
}


/**
 *  Function will block the main runtime loop until the login credentials
 *  where retrieved from the server. Will return null if failed authentication.
 */
export async function fetchTokenCredentials(email, password) {
    try {
        const response = await atteptLogin(email, password)
        const responseData = response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
        let data = camelizeKeys(responseData);
        const { accessToken, refreshToken } = data;

        // Save our tokens.
        setAccessTokenInLocalStorage(accessToken);
        setRefreshTokenInLocalStorage(accessToken);

        // Return our result.
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    } catch (error) {
        return null;
    }
}


/**
 *  Function makes a call to our login API endpoint.
 */
function atteptRefresh(refreshTokenString) {
    return axios.post(process.env.REACT_APP_API_HOST+'/api/profile_with_token_refresh', {
        'refresh_token': refreshTokenString,
    })
}


/**
 *  Function will block the main runtime loop until the refresh token credentials
 *  where retrieved from the server. Will return null if failed authentication.
 */
export async function fetchRefreshCredentials(refreshTokenString) {
    try {
        const response = await atteptRefresh(refreshTokenString)
        const responseData = response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
        let data = camelizeKeys(responseData);
        const { accessToken, refreshToken } = data;

        // Save our tokens.
        setAccessTokenInLocalStorage(accessToken);
        setRefreshTokenInLocalStorage(accessToken);

        // Return our result.
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    } catch (error) {
        return null;
    }
}

/**
 *  Function will take the custom axios instance and attach a token refresh
 *  handler which will attempt to refresh the token on `401` errors. This
 *  function takes advantage of Axio's interceptors.
 */
export function attachAxiosRefreshTokenHandler(customAxios) {
    customAxios.interceptors.response.use(
        function(response) {
            // If the request succeeds, we don't have to do anything and just return the response
            return response
        },
        function(error) {
            const errorResponse = error.response
            if (isTokenExpiredError(errorResponse)) {
                return resetTokenAndReattemptRequest(error)
            }
            // If the error is due to other reasons, we just throw it back to axios
            return Promise.reject(error)
        }
    )

    /**
     *  Function detects if our token expired and requires refreshing.
     */
    function isTokenExpiredError(errorResponse) {
        if (errorResponse.status === 401) {
            return true;
        } else {
            return false;
        }
    }
}


let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the oAuth 2.0 refresh complete
let subscribers = [];


async function resetTokenAndReattemptRequest(error) {
    try {
        const { response: errorResponse } = error;
        const resetToken = getRefreshTokenFromLocalStorage();
        if (!resetToken) {
            // We can't refresh, throw the error anyway
            return Promise.reject(error);
        }

        /*
         * Proceed to the token refresh procedure
         * We create a new Promise that will retry the request,
         * clone all the request configuration from the failed
         * request in the error object.
         */
        const retryOriginalRequest = new Promise(resolve => {
            /* We need to add the request retry to the queue
               since there another request that already attempt to
               refresh the token */
            addSubscriber(access_token => {
                errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                resolve(axios(errorResponse.config));
            });
        });

        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            const refreshToken = getRefreshTokenFromLocalStorage();
            const refreshTokenString = refreshToken.token;

            // Attempt to get our credentials from our server.
            const credentials = await fetchRefreshCredentials(refreshTokenString)

            // If a null is returned then our server failed refreshing so
            // return an error.
            if (!credentials) {
                return Promise.reject(error);
            }

            const accessTokenString = credentials.accessToken.token;

            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(accessTokenString);
        }
        return retryOriginalRequest;

    } catch (err) {
        return Promise.reject(err);
    }
}

function onAccessTokenFetched(access_token) {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}


/**
 * Special thanks for the detailed explanation via link:
 * https://www.techynovice.com/setting-up-JWT-token-refresh-mechanism-with-axios/
 */
