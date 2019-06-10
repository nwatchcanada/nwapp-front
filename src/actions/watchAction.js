import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAssociateReactSelectOptions(associateList=[], selectName="associate") {
    const associateOptions = [];
    const isNotProductionsEmpty = isEmpty(associateList) === false;
    if (isNotProductionsEmpty) {
        const results = associateList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let associate = results[i];
                associateOptions.push({
                    selectName: selectName,
                    value: associate.slug,
                    label: associate.name
                });
            }
        }
    }
    return associateOptions;
}
