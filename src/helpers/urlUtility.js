import { NWAPP_API_BASE_PATH } from "../constants/api";

/**
 * Function will get the subdomain that the browser is currentl in.
 * Special thanks to: https://stackoverflow.com/a/38863509
 */
export function getSubdomain() {
    let host = window.location.host;
    let parts = host.split(".");
    let subdomain = "";

    // If we have no subdomains then we return nothing.
    if (parts.length <= 1) {
        return null;
    }

    // // For debugging purposes.
    // console.log(host);
    // console.log(protocol);
    // console.log(parts);
    // console.log(parts[0]);

    // Our system will only have single sub-domains as a result this is all we
    // need to worry about.
    subdomain = parts[0];

    // Return our subdomain if it is a valid subdomain.
    if (subdomain === "www" || subdomain === "nwapp") {
        return null;
    } else {
        return subdomain;
    }
}


/**
 *  Function takes the React environment variables and returns the base URL used
 *  for all API communication with our web-service. Function takes into account
 *  subdomains (a.k.a. tenancy) as well. Please use this function to set the
 *  ``Axios`` base URL when making API calls to the backend server.
 */
export function getAPIBaseURL() {
    const schema = getSubdomain();
    if (schema !== null && schema !== undefined && schema !== "www" && schema !== "public") {
        return process.env.REACT_APP_WWW_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + NWAPP_API_BASE_PATH;
    } else {
        return process.env.REACT_APP_WWW_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN + NWAPP_API_BASE_PATH;
    }
}


/**
 *  Function always returns the public sub-domain of our API web-server.
 */
export function getPublicAPIBaseURL() {
    return process.env.REACT_APP_WWW_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN + NWAPP_API_BASE_PATH;
}


/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export function getParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
