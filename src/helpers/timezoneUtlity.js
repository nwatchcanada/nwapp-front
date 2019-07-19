import timezones from "../constants/timezones";


/**
 *  Utility function will generate the `react-select` options we need to
 *  populate a field.
 */
export function getTimezoneReactSelectOptions(selectName="timezone") {
    const timezoneOptions = [];
    const keys = Object.keys(timezones);
    for (const key of keys) {
        let value = timezones[key];
        timezoneOptions.push({
            selectName: selectName,
            value: value,
            label: key
        });
    }
    return timezoneOptions;
}
