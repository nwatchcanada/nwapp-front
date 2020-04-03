import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminWatchMapBoundryComponent from "../../../../components/watches/admin/retrieve/adminRetrieveMapComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullWatchDetail } from '../../../../actions/watchActions';
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminWatchMapBoundaryContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const watch = localStorageGetObjectItem("nwapp-admin-retrieve-watch-"+slug.toString() );
        const isLoading = isEmpty(watch);

        // Update state.
        this.state = {
            slug: slug,
            watch: watch,
            isLoading: isLoading,
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
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

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/settings/watchs/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/settings/watch/biz/"+this.state.slug+"/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug } = this.state;
        console.log("TEST!!!!!!!");
        return (
            <AdminWatchMapBoundryComponent
                slug={slug}
                watch={this.props.watch}
                onBack={this.onBack}
                onClick={this.onClick}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        watch: store.watchDetailState,
        flashMessage: store.flashMessageState,
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
)(AdminWatchMapBoundaryContainer);
