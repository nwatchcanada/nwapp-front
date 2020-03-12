import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminTaskSearchResultComponent from "../../../../components/taskItems/admin/search/taskSearchResultComponent";


class AdminTaskSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const results = [{
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
        }];
        this.setState({
            results: results,
        });
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


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminTaskSearchResultComponent
                results={this.state.results}
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
)(AdminTaskSearchResultContainer);
