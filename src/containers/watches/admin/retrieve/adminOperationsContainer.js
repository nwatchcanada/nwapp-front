import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminWatchOperationsComponent from "../../../../components/watches/admin/retrieve/adminOperationsComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullWatchDetail } from '../../../../actions/watchActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminWatchOperationsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const watch = localStorageGetObjectItem("nwapp-admin-retrieve-watch-"+slug.toString() );
        const isLoading = isEmpty(watch);

        // Update state.
        this.state = {
            slug: slug,
            isLoading: false,
            watch: watch
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onAddJobClick = this.onAddJobClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullWatchDetail(
            this.state.slug,
            this.onSuccessCallback,
            this.onFailureCallback
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ isLoading: false, watch: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-watch-"+this.state.slug.toString(), response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onAddJobClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-watchId", this.props.watchDetail.id);
        localStorage.setItem("workery-create-order-watchGivenName", this.props.watchDetail.givenName);
        localStorage.setItem("workery-create-order-watchLastName", this.props.watchDetail.lastName);
        this.props.history.push("/admin/watch/"+this.state.slug+"/promote/step-1");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, isLoading } = this.state;
        const watch = isEmpty(this.state.watch) ? {} : this.state.watch;
        return (
            <AdminWatchOperationsComponent
                slug={this.state.slug}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
                onAddJobClick={this.onAddJobClick}
                watch={this.props.watchDetail}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        watchDetail: store.watchDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullWatchDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullWatchDetail(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchOperationsContainer);
