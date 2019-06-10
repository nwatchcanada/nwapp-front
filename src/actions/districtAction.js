import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getDistrictReactSelectOptions(districtList) {
    const districtOptions = [];
    const isNotProductionsEmpty = isEmpty(districtList) === false;
    if (isNotProductionsEmpty) {
        const results = districtList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let district = results[i];
                districtOptions.push({
                    selectName: "district",
                    value: district.slug,
                    label: district.name
                });
            }
        }
    }
    return districtOptions;
}
