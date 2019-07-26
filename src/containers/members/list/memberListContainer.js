import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberListComponent from "../../../components/members/list/memberListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class MemberListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            members: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const members = [{
            'slug': 'argyle-member-1',
            'icon': 'home',
            'firstName': "Bob",
            'lastName': "Page",
            "phone": "(111) 222-3333",
            'email': "1@1.com",
            "typeOf": "active",
        },{
            'slug': 'byron-member-1',
            'icon': 'building',
            'firstName': "Walter",
            'lastName': "Simons",
            "phone": "(222) 333-4444",
            'email': "2@2.com",
            "typeOf": "active",
        },{
            'slug': 'carling-member-1',
            'icon': 'university',
            'firstName': "JC",
            'lastName': "Denton",
            "phone": "(333) 444-5555",
            'email': "3@3.com",
            "typeOf": "active",
        }];
        this.setState({
            members: members,
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

    filterMembers() {
        let filteredMembers = [];
        if (this.state.members === undefined || this.state.members === null) {
            return [];
        }
        for (let i = 0; i < this.state.members.length; i++) {
            let member = this.state.members[i];
            if (member.typeOf === this.state.filter) {
                filteredMembers.push(member);
            }
        }
        return filteredMembers;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <MemberListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                members={this.filterMembers()}
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
)(MemberListContainer);
