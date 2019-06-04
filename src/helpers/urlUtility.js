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
    if (schema !== null && schema !== undefined && schema !== "www") {
        return process.env.REACT_APP_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + '/api';
    } else {
        return process.env.REACT_APP_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN + '/api';
    }
}