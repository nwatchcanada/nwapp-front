import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActionConcernItemTaskStep3Component from "../../../components/tasks/actionConcernItem/actionConcernItemTaskStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';


class ActionConcernItemTaskStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            willAction: localStorageGetIntegerItem("nwapp-task-3-willAction"),
            reason: localStorageGetIntegerItem("nwapp-task-3-reason"),
            reasonOther: localStorage.getItem("nwapp-task-3-reasonOther"),
        }

        this.onClick = this.onClick.bind(this);
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

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.setFlashMessage("success", "Task has been successfully closed.");
        this.props.history.push("/tasks");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { willAction, reason, reasonOther, errors, slug, } = this.state;
        
        return (
            <ActionConcernItemTaskStep3Component
                slug={slug}
                willAction={willAction}
                reason={reason}
                reasonOther={reasonOther}
                errors={errors}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionConcernItemTaskStep3Container);
