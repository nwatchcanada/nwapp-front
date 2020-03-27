import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssignDistrictAssociateTaskStep1Component from "../../../../../components/taskItems/admin/operations/assignDistrictAssociate/step1Component";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullTaskItem } from "../../../../../actions/taskItemActions";


class AssignDistrictAssociateTaskStep1Container extends Component {
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
            isLoading: true,
            errors: {}
        }

        this.onSuccessfulPullCallback = this.onSuccessfulPullCallback.bind(this);
        this.onFailedPullCallback = this.onFailedPullCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTaskItem(
            this.state.uuid,
            this.onSuccessfulPullCallback,
            this.onFailedPullCallback,
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

    onSuccessfulPullCallback(taskItem) {
        this.setState({
            taskItem: taskItem,
            isLoading: false,
        });
    }

    onFailedPullCallback(errors) {
        console.log(errors);
        this.setState({
            errors: errors,
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/task/3/"+this.state.uuid+"/step-2");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AssignDistrictAssociateTaskStep1Component
                urlArgument={this.state.urlArgument}
                uuid={this.state.uuid}
                taskItem={this.state.taskItem}
                isLoading={this.state.isLoading}
                errors={this.state.errors}
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
        taskItem: store.taskItemDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullTaskItem: (slug, successCallback, failedCallback) => {
            dispatch(pullTaskItem(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignDistrictAssociateTaskStep1Container);
