import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskListComponent from "../../components/tasks/taskListComponent";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class TaskListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "pending"
        }
        this.onFilterClick = this.onFilterClick.bind(this);
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

    onFilterClick(e, filter) {
        e.preventDefault();
        this.setState({
            filter: filter,
        })
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const tasks = [{
            'slug': 'argyle-task-1',
            'dueDate': "July 20, 2019",
            'taskName': "Assign Associate to Watch",
            "watchName": "Argyle"
        },{
            'slug': 'byron-task-1',
            'dueDate': "April 10, 2019",
            'taskName': "Assign Area Coordinator to Watch",
            "watchName": "Byron"
        },{
            'slug': 'carling-task-1',
            'dueDate': "January 2, 2019",
            'taskName': "Assign Area Coordinator to Watch",
            "watchName": "Carling"
        }];
        return (
            <TaskListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                tasks={tasks}
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
)(TaskListContainer);
