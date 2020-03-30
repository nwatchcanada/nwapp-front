import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';

import AdminAssociateMapComponent from "../../../../components/associates/admin/list/adminMapComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateList } from "../../../../actions/associateActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class AdminAssociateMapContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Force active users as per issue via https://github.com/over55/nwapp-front/issues/296
        var parametersMap = new Map();
        parametersMap.set("state", "active");
        parametersMap.set("roleId", 6);
        parametersMap.set("hasPosition", true);

        this.state = {
            //
            coords: [42.983611, -81.249722],
            zoom: 13,

            // Pagination
            page: 1,
            sizePerPage: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,
        }
        this.onTableChange = this.onTableChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
        this.onZoomEnd = this.onZoomEnd.bind(this);
        this.onPopupOpen = this.onPopupOpen.bind(this);
        this.onPopupClose = this.onPopupClose.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullAssociateList(
            this.state.page,
            this.state.sizePerPage,
            this.state.parametersMap,
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
                    this.props.pullAssociateList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, page, sizePerPage); // For debugging purposes only.

            this.setState(
                { page: page, sizePerPage:sizePerPage, isLoading: true, },
                ()=>{
                    this.props.pullAssociateList(page, sizePerPage, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "filter") {
            //
            // DEPRECATED VIA https://github.com/over55/nwapp-front/issues/296
            //
            console.log("onTableChange | filter |", type, filters); // For debugging purposes only.
            if (filters.state === undefined) {
                parametersMap.delete("state");
            } else {
                const filterVal = filters.state.filterVal;
                parametersMap.set("state", filterVal);
            }
            if (filters.roleId === undefined) {
                parametersMap.delete("roleId");
            } else {
                const filterVal = filters.roleId.filterVal;
                parametersMap.set("roleId", filterVal);
            }
            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullAssociateList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );
        }else {
            alert("Unsupported feature detected!!"+type);
        }
    }

    onMoveEnd(event) {

    }

    onZoomEnd(event) {

    }

    onPopupOpen(event, slug) {

    }

    onPopupClose(event, slug) {

    }

    onClick(event, slug) {
        event.preventDefault();
        this.props.history.push("/admin/associate/"+slug);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading } = this.state;

        const tenant = isEmpty(this.props.tenant)
            ? {latitude: 0, longitude: 0, zoom: 0,}
            : this.props.tenant;
            
        return (
            <AdminAssociateMapComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                associateList={this.props.associateList}
                onTableChange={this.onTableChange}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
                tenant={tenant}
                onMoveEnd={this.onMoveEnd}
                onPopupOpen={this.onPopupOpen}
                onPopupClose={this.onPopupClose}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        associateList: store.associateListState,
        tenant: store.tenantDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateMapContainer);
