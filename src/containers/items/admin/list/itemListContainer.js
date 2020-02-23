import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminItemListComponent from "../../../../components/items/admin/list/itemListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";
import { pullItemList } from "../../../../actions/itemActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class AdminItemListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Force active users as per issue via https://github.com/over55/nwapp-front/issues/296
        var parametersMap = new Map();
        parametersMap.set("state", "active");

        this.state = {
            // Pagination
            page: 1,
            sizePerPage: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,
        }
        // this.onTableChange = this.onTableChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullItemList(
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

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
        this.setState({
            isLoading: false,
        });
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
        this.setState({
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading } = this.state;
        const itemsResponse = this.props.itemList;
        const items = !isEmpty(itemsResponse) && !isEmpty(itemsResponse.results)
            ? itemsResponse.results
            : [];

        return (
            <AdminItemListComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                items={items}
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
        itemList: store.itemListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullItemList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullItemList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminItemListContainer);
