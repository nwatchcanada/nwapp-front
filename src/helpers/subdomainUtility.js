/**
 * Function will get the subdomain that the browser is currentl in.
 * Special thanks to: https://stackoverflow.com/a/38863509
 */
export default function getSubdomain() {
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
