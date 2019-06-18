
/**
 *  The extension functions of `localStorage` to handle saving and extracting
 *  JSON `objects` to lour `localStorage`. Special thanks to the following:
 *  https://stackoverflow.com/a/2010994
 */

export function localStorageGetObjectItem(key) {
    const stringifiedObject = localStorage.getItem(key);
    let anObject = JSON.parse(stringifiedObject);
    if (anObject  === undefined || anObject === null) {
        anObject = {};
    }
    return anObject;
}

export function localStorageGetArrayItem(key) {
    const stringifiedObject = localStorage.getItem(key);
    console.log("localStorageGetArrayItem | String:", stringifiedObject);
    let anObject = JSON.parse(stringifiedObject);
    console.log("localStorageGetArrayItem | Object:", anObject);
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

export function localStorageSetObjectOrArrayItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
