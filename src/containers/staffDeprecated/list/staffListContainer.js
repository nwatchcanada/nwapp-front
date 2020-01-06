import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffListComponent from "../../../components/staff/list/staffListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class StaffListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            staffs: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterStaffs = this.filterStaffs.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const staffs = [{
            'slug': 'argyle',
            'icon': 'home',
            'firstName': "Bob",
            'lastName': "Page",
            "phone": "(111) 222-3333",
            'email': "1@1.com",
            "typeOf": "active",
        },{
            'slug': 'byron',
            'icon': 'building',
            'firstName': "Walter",
            'lastName': "Simons",
            "phone": "(222) 333-4444",
            'email': "2@2.com",
            "typeOf": "active",
        },{
            'slug': 'carling',
            'icon': 'university',
            'firstName': "JC",
            'lastName': "Denton",
            "phone": "(333) 444-5555",
            'email': "3@3.com",
            "typeOf": "active",
        }];
        this.setState({
            staffs: staffs,
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

    filterStaffs() {
        let filteredStaffs = [];
        if (this.state.staffs === undefined || this.state.staffs === null) {
            return [];
        }
        for (let i = 0; i < this.state.staffs.length; i++) {
            let staff = this.state.staffs[i];
            if (staff.typeOf === this.state.filter) {
                filteredStaffs.push(staff);
            }
        }
        return filteredStaffs;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <StaffListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                staffs={this.filterStaffs()}
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
)(StaffListContainer);
