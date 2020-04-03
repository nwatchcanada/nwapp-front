import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import AdminSearchResultsComponent from "../../components/search/searchResultsComponent";
import { localStorageGetArrayItem } from '../../helpers/localStorageUtility';
import { clearFlashMessage } from "../../actions/flashMessageActions";
import { pullUnifiedSearchItemList } from "../../actions/unifiedSearchItemActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../constants/api";


class AdminSearchResultsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Pagination
            page: 1,
            sizePerPage: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: new Map(),

            // Everything else.
            isLoading: true,
            keyword: localStorage.getItem("nwapp-search-keyword"),
            tags: localStorageGetArrayItem("nwapp-search-tags"),
        }
        this.onTableChange = this.onTableChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        var parametersMap = this.state.parametersMap;

        // DEVELOPERS NOTE:
        // WE NEED TO APPLY OUR SKILLSET FILTERING RIGHT HERE SO THE API WILL
        // PERFORM THE FILTERING.
        let tagPKs = "";
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            tagPKs += tag.value + ",";
        }
        tagPKs = tagPKs.slice(0, -1); // Note: Remove last character in string.
        console.log(tagPKs); // For debugging purposes only.
        parametersMap.set("tags", tagPKs);

        if (this.state.keyword !== "" && this.state.keyword !== undefined && this.state.keyword !== null && this.state.keyword !== "null") {
            parametersMap.set("keyword", this.state.keyword);
        }

        this.props.pullUnifiedSearchItemList(
            this.state.page,
            this.state.sizePerPage,
            parametersMap,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(response) {
        console.log("onSuccessfulSubmissionCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessfulSubmissionCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessfulSubmissionCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    /**
     *  Function takes the user interactions made with the table and perform
     *  remote API calls to update the table based on user selection.
     */
    onTableChange(type, { sortField, sortOrder, data, page, sizePerPage, filters }) {
        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        // DEVELOPERS NOTE:
        // WE NEED TO APPLY OUR SKILLSET FILTERING RIGHT HERE SO THE API WILL
        // PERFORM THE FILTERING.
        let tagPKs = "";
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            tagPKs += tag.value + ",";
        }
        tagPKs = tagPKs.slice(0, -1); // Note: Remove last character in string.
        console.log(tagPKs); // For debugging purposes only.
        parametersMap.set("tags", tagPKs);

        if (type === "sort") {
            console.log(type, sortField, sortOrder); // For debugging purposes only.

            if (sortOrder === "asc") {
                parametersMap.set('o', decamelize(sortField));
            }
            if (sortOrder === "desc") {
                parametersMap.set('o', "-"+decamelize(sortField));
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullUnifiedSearchItemList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, page, sizePerPage); // For debugging purposes only.

            this.setState(
                { page: page, sizePerPage:sizePerPage, isLoading: true, },
                ()=>{
                    this.props.pullUnifiedSearchItemList(page, sizePerPage, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "filter") {
            console.log(type, filters); // For debugging purposes only.
            if (filters.state === undefined) {
                parametersMap.delete("state");
            } else {
                const filterVal = filters.state.filterVal;
                parametersMap.set("state", filterVal);
            }
            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullUnifiedSearchItemList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );
        }else {
            alert("Unsupported feature detected!!"+type);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading } = this.state;
        return (
            <AdminSearchResultsComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                unifiedSearchItemList={this.props.unifiedSearchItemList}
                onTableChange={this.onTableChange}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        unifiedSearchItemList: store.unifiedSearchItemListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullUnifiedSearchItemList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullUnifiedSearchItemList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSearchResultsContainer);
