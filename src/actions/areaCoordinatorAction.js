import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAreaCoordinatorReactSelectOptions(aeaCoordinatorList={}, selectName="aeaCoordinator") {
    const aeaCoordinatorOptions = [];
    const isNotProductionsEmpty = isEmpty(aeaCoordinatorList) === false;
    if (isNotProductionsEmpty) {
        const results = aeaCoordinatorList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let aeaCoordinator = results[i];
                aeaCoordinatorOptions.push({
                    selectName: selectName,
                    value: aeaCoordinator.slug,
                    label: aeaCoordinator.name
                });
            }
        }
    }
    return aeaCoordinatorOptions;
}
