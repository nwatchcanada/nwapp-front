/**
 * Function will get the subdomain that the browser is currentl in.
 * Special thanks to: https://stackoverflow.com/a/38863509
 */
export function getTenantSchema() {
    let host = window.location.host;
    // let protocol = window.location.protocol;
    let parts = host.split(".");
    let subdomain = "";
    // If we get more than 3 parts, then we have a subdomain
    // INFO: This could be 4, if you have a co.uk TLD or something like that.

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
    if (subdomain === "www" || subdomain === "api") {
        return null;
    } else {
        return subdomain;
    }
}
