
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
    let anObject = JSON.parse(stringifiedObject);
    if (anObject  === undefined || anObject === null) {
        anObject = [];
    }
    return anObject;
}

export function localStorageSetObjectOrArrayItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
