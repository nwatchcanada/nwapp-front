import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAreaCoordinatorReactSelectOptions(areaCoordinatorList={}, selectName="areaCoordinator") {
    const areaCoordinatorOptions = [];
    const isNotProductionsEmpty = isEmpty(areaCoordinatorList) === false;
    if (isNotProductionsEmpty) {
        const results = areaCoordinatorList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let areaCoordinator = results[i];
                areaCoordinatorOptions.push({
                    selectName: selectName,
                    value: areaCoordinator.slug,
                    label: areaCoordinator.name
                });
            }
        }
    }
    return areaCoordinatorOptions;
}
