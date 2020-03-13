import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssignWatchAreaCoordinatorTaskStep3Component from "../../../components/tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';


class AssignWatchAreaCoordinatorTaskStep3Container extends Component {
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
            areaCoordinator: localStorage.getItem('nwapp-task-2-areaCoordinator'),
            areaCoordinatorLabel: localStorage.getItem('nwapp-task-2-areaCoordinator-label'),
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
        const taskData = {
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/task/argyle'
        };
        return (
            <AssignWatchAreaCoordinatorTaskStep3Component
                urlArgument={this.state.urlArgument}
                slug={this.state.slug}
                taskData={taskData}
                onBack={this.onBack}
                onClick={this.onClick}
                areaCoordinatorLabel={this.state.areaCoordinatorLabel}
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
)(AssignWatchAreaCoordinatorTaskStep3Container);
