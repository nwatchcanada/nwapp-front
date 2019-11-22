
/**
 *  The extension functions of `localStorage` to handle saving and extracting
 *  JSON `objects` to lour `localStorage`. Special thanks to the following:
 *  https://stackoverflow.com/a/2010994
 */

export function localStorageGetObjectItem(key) {
    const stringifiedObject = localStorage.getItem(key);
    if (stringifiedObject === "undefined") { // Defensive Code: Error.
        console.error("localStorageGetObjectItem: Detected `undefined` string, could be potential error.");
        return null;
    }
    let anObject = JSON.parse(stringifiedObject);
    if (anObject  === undefined || anObject === null) {
        anObject = {};
    }
    return anObject;
}

export function localStorageGetArrayItem(key) {
    const stringifiedObject = localStorage.getItem(key);
    if (stringifiedObject === "undefined") { // Defensive Code: Error.
        console.error("localStorageGetArrayItem: Detected `undefined` string, could be potential error.");
        return null;
    }
    // console.log("localStorageGetArrayItem | String:", stringifiedObject);
    let anObject = JSON.parse(stringifiedObject);
    // console.log("localStorageGetArrayItem | Object:", anObject);
    if (anObject  === undefined || anObject === null) {
        anObject = [];
    }
    return anObject;
}

export function localStorageGetDateItem(key) {
    const stringifiedObject = localStorageGetObjectItem(key);
    const date = new Date(stringifiedObject);
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date.getTime())) {  // d.valueOf() could also work
            return null; // date is not valid
        } else {
            return date;// date is valid
        }
    } else {
        return null; // not a date
    }
}


/**
 *  Function will return either a boolean value saved in local storage or return
 *  a `null` value if nothing was found in the storage.
 */
export function localStorageGetBooleanOrNullItem(key) {
    const str = localStorage.getItem(key);
    if (str === "undefined" || str === "null") { // Defensive Code: Error.
        console.error("localStorageGetBooleanOrNullItem: Detected `undefined` string, could be potential error.");
        return null;
    }
    if (str === "false" || str === "False" || str === "0" || str === "no" || str === "No") {
        return false
    } else if (str === "true" || str === "true" || str === "1" || str === "yes" || str === "Yes") {
        return true
    } else {
        return null;
    }
}


/**
 *  Function will return either a boolean value saved in local storage or return
 *  a `False` value if nothing was found in the storage.
 */
export function localStorageGetBooleanItem(key) {
    const result = localStorageGetBooleanOrNullItem(key);
    return (result === null) ? false : result;
}


export function localStorageGetIntegerItem(key) {
    const str = localStorage.getItem(key);
    if (str === "undefined" || str === "null") { // Defensive Code: Error.
        console.error("localStorageGetIntegerItem: Detected `undefined` string, could be potential error.");
        return null;
    }
    return parseInt(str);
}

export function localStorageGetFloatItem(key) {
    const str = localStorage.getItem(key);
    if (str === "undefined" || str === "null") { // Defensive Code: Error.
        console.error("localStorageGetFloatItem: Detected `undefined` string, could be potential error.");
        return null;
    }
    return parseFloat(str);
}

export function localStorageSetObjectOrArrayItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


export function localStorageRemoveItemsContaining(substring) {
    // Iterate through all the keys in local storage and try to find the
    // matching substring to see if we must delete the particular item.
    for(var key in localStorage) {
        if ( key.includes(substring) ) {
            let value = localStorage.getItem(key);
            console.log("Deleting from localStorage:", key, ":", value);
            localStorage.removeItem(key);
        }
    }
}
