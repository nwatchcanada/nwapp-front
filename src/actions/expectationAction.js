import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getExpectationReactSelectOptions(howHearList=[], selectName="expectation") {
    const howHearOptions = [];
    const isNotProductionsEmpty = isEmpty(howHearList) === false;
    if (isNotProductionsEmpty) {
        const results = howHearList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let howHear = results[i];
                howHearOptions.push({
                    selectName: selectName,
                    value: howHear.slug,
                    label: howHear.name
                });
                // console.log(howHear);
            }
        }
    }
    return howHearOptions;
}
