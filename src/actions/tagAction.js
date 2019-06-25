import isEmpty from 'lodash/isEmpty';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getTagReactSelectOptions(tagList=[], selectName="tag") {
    const tagOptions = [];
    const isNotProductionsEmpty = isEmpty(tagList) === false;
    if (isNotProductionsEmpty) {
        const results = tagList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let tag = results[i];
                tagOptions.push({
                    selectName: selectName,
                    value: tag.slug,
                    label: tag.name
                });
                // console.log(tag);
            }
        }
    }
    return tagOptions;
}
