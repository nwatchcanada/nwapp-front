import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminResourceRetrieveComponent from "../../../../../components/settings/admin/resource/retrieve/adminRetrieveComponent";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullResourceItem } from '../../../../../actions/resourceActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";


class AdminResourceRetrieveContainer extends Component {
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
        const resource = localStorageGetObjectItem("nwapp-admin-retrieve-resource-"+slug );
        const isLoading = isEmpty(resource);

        // Update state.
        this.state = {
            slug: slug,
            resource: resource,
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
        this.props.pullResourceItem(
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
        this.setState({ isLoading: false, resource: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-resource-"+this.state.slug.toString(), response);
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
        this.props.history.push("/admin/settings/resources/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        if (this.props.resource.typeOf === LINK_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/settings/resource/update-link/"+this.props.resource.slug);
        } else if (this.props.resource.typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/settings/resource/update-yt-video/"+this.props.resource.slug);
        } else if (this.props.resource.typeOf === IMAGE_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/settings/resource/update-image/"+this.props.resource.slug);
        } else if (this.props.resource.typeOf === FILE_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/settings/resource/update-file/"+this.props.resource.slug);
        } else {
            alert("Cannot find the matching type of...");
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminResourceRetrieveComponent
                resourceData={this.props.resource}
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
        resource: store.resourceDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullResourceItem: (slug, successCallback, failedCallback) => {
            dispatch(pullResourceItem(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminResourceRetrieveContainer);
