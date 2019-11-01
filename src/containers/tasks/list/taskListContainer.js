import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskListComponent from "../../../components/tasks/list/taskListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class TaskListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "unassigned",
            tasks: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterTasks = this.filterTasks.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const tasks = [{
            'slug': 'argyle-task-1',
            'dueDate': "July 20, 2019",
            'taskName': "Assign Associate to Watch",
            "watchName": "Argyle",
            "category": "unassigned",
            "typeOf": "unassigned-watch-associate",
        },{
            'slug': 'byron-task-1',
            'dueDate': "April 10, 2019",
            'taskName': "Assign Area Coordinator to Watch",
            "watchName": "Byron",
            "category": "unassigned",
            "typeOf": "unassigned-watch-area-coordinator",
        },{
            'slug': 'carling-task-1',
            'dueDate': "January 2, 2019",
            'taskName': "Assign Area Coordinator to Watch",
            "watchName": "Carling",
            "category": "unassigned",
            "typeOf": "unassigned-watch-associate",
        },{
            'slug': 'delta-task-3',
            'dueDate': "March 2, 2019",
            'taskName': "Action a NW concern item",
            "watchName": "Carling",
            "category": "unassigned",
            "typeOf": "action-concern-item",
        }];
        this.setState({
            tasks: tasks,
        });
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

    filterTasks() {
        let filteredTasks = [];
        if (this.state.tasks === undefined || this.state.tasks === null) {
            return [];
        }
        for (let i = 0; i < this.state.tasks.length; i++) {
            let task = this.state.tasks[i];
            if (task.category === this.state.filter) {
                filteredTasks.push(task);
            }
        }
        return filteredTasks;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <TaskListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                tasks={this.filterTasks()}
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
