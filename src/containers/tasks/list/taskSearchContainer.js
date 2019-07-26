import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskSearchComponent from "../../../components/tasks/list/taskSearchComponent";


class TaskListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props)

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument } = this.props.match.params;

        this.state = {
            urlArgument: urlArgument,
            advancedSearchActive: false
        }
        this.onAdvancedSearchPanelToggle = this.onAdvancedSearchPanelToggle.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onAdvancedSearchClick = this.onAdvancedSearchClick.bind(this);
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

    onAdvancedSearchPanelToggle() {
        this.setState({
            advancedSearchActive: !this.state.advancedSearchActive
        });
    }

    onSearchClick() {
        this.props.history.push("/tasks/"+this.state.urlArgument+"/search-results");
    }

    onAdvancedSearchClick() {
        this.props.history.push("/tasks/"+this.state.urlArgument+"/search-results");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <TaskSearchComponent
                urlArgument={this.state.urlArgument}
                advancedSearchActive={this.state.advancedSearchActive}
                onAdvancedSearchPanelToggle={this.onAdvancedSearchPanelToggle}
                onSearchClick={this.onSearchClick}
                onAdvancedSearchClick={this.onAdvancedSearchClick}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListContainer);
