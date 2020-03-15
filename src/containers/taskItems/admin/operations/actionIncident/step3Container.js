// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
//
// import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
//
//
// class ActionIncidentTaskStep3Container extends Component {

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import ActionIncidentItemTaskStep3Component from "../../../../../components/taskItems/admin/operations/actionIncident/step3Component";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { putTaskItem } from "../../../../../actions/taskItemActions";
import {
    localStorageGetIntegerItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';


class ActionIncidentTaskStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { uuid } = this.props.match.params;

        // Update state.
        this.state = {
            uuid: uuid,
            willAction: localStorageGetIntegerItem("nwapp-task-4-willAction"),
            comment: localStorage.getItem("nwapp-task-4-comment"),
            reason: localStorageGetIntegerItem("nwapp-task-4-reason"),
            reasonOther: localStorage.getItem("nwapp-task-4-reasonOther"),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        if (isNaN(this.state.reason)) {
            postData.reason = 0;
        }

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

     componentDidMount() {
         window.scrollTo(0, 0);  // Start the page at the top of the page.
     }

     componentWillUnmount() {
         // This code will fix the "ReactJS & Redux: Can't perform a React state
         // update on an unmounted component" issue as explained in:
         // https://stackoverflow.com/a/53829700
         this.setState = (state,callback)=>{
             return;
         };
     }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
                errors: {},
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                localStorageRemoveItemsContaining("nwapp-task-4-");
                this.props.setFlashMessage("success", "Task item has been successfully modified.");
                this.props.history.push("/admin/tasks");
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        // this.props.setFlashMessage("success", "Task has been successfully closed.");
        // this.props.history.push("/tasks");

        this.setState({
            errors: {},
            isLoading: true,
        }, ()=>{
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putTaskItem(
                this.getPostData(),
                this.onSuccessCallback,
                this.onFailureCallback
            );
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { willAction, comment, reason, reasonOther, errors, uuid, isLoading } = this.state;

        return (
            <ActionIncidentItemTaskStep3Component
                uuid={uuid}
                willAction={willAction}
                comment={comment}
                reason={reason}
                reasonOther={reasonOther}
                errors={errors}
                isLoading={isLoading}
                onBack={this.onBack}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putTaskItem: (postData, successCallback, failedCallback) => {
            dispatch(putTaskItem(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionIncidentTaskStep3Container);
