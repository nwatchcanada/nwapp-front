import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberListComponent from "../../components/members/memberListComponent";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class MemberListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

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


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const tableData = [{
            'slug': 'Argyle',
            'icon': 'house',
            'number': 1,
            'firstName': 'Shinji',
            'lastName': 'Ikari',
            'phone': '(789) 789-7890',
            'email': 'shinji.ikari@nerv.worldgov',
            'absoluteUrl': '/member/argyle'
        },{
            'slug': 'byron',
            'icon': 'house',
            'number': 2,
            'firstName': 'Mariya',
            'lastName': 'Takeuchi',
            'phone': '(321) 321-3210',
            'email': 'plastic_lover@gmail.com',
            'absoluteUrl': '/member/byron'
        },{
            'slug': 'carling',
            'icon': 'briefcase',
            'number': 3,
            'firstName': 'Rei',
            'lastName': 'Ayanami',
            'phone': '(123) 123-1234',
            'email': 'rei.ayanami@nerv.worldgov',
            'absoluteUrl': '/member/carling'
        }];
        return (
            <MemberListComponent
                tableData={tableData}
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
