import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssignWatchAreaCoordinatorTaskStep1Component from "../../../../../components/taskItems/admin/operations/assignWatchAreaCoordinator/step1Component";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";


class AssignWatchAreaCoordinatorTaskStep1Container extends Component {
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

         // Clear any and all flash messages in our queue to be rendered.
         this.props.clearFlashMessage();
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
        this.props.history.push("/admin/task/1/"+this.state.uuid+"/step-2");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AssignWatchAreaCoordinatorTaskStep1Component
                urlArgument={this.state.urlArgument}
                uuid={this.state.uuid}
                onBack={this.onBack}
                onClick={this.onClick}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignWatchAreaCoordinatorTaskStep1Container);
