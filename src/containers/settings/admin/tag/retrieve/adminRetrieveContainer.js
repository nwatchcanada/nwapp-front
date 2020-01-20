import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminTagRetrieveComponent from "../../../../../components/settings/admin/tag/retrieve/adminRetrieveComponent";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullTag } from '../../../../../actions/tagActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';


class AdminTagRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const tag = localStorageGetObjectItem("nwapp-admin-retrieve-tag-"+id.toString() );
        const isLoading = isEmpty(tag);

        // Update state.
        this.state = {
            id: id,
            tag: tag,
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
        this.props.pullTag(
            this.state.id,
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
        this.setState({ isLoading: false, tag: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-tag-"+this.state.id.toString(), response);
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
        this.props.history.push("/admin/settings/tags/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/settings/tag/"+this.state.id+"/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminTagRetrieveComponent
                tagData={this.props.tag}
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
        tag: store.tagDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullTag: (id, successCallback, failedCallback) => {
            dispatch(pullTag(id, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTagRetrieveContainer);
