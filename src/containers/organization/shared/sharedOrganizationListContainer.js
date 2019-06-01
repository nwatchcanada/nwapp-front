import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedOrganizationListComponent from "../../../components/organizations/shared/sharedOrganizationListComponent";
import { pullProfile } from "../../../actions/profileAction";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class SharedOrganizationListContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        this.props.pullProfile();
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
        this.setState({
            errors: errors
        })

        // // The following code will cause the screen to scroll to the top of
        // // the page. Please see ``react-scroll`` for more information:
        // // https://github.com/fisshy/react-scroll
        // var scroll = Scroll.animateScroll;
        // scroll.scrollToTop();
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
        // Return our GUI.
        const sampleData = [
            {
                "schema": "london",
                "name": "City of London Neigbhourhood Watch",
                "absoluteUrl": "http://london."+process.env.REACT_APP_DOMAIN+"/dashboard"
            },{
                "schema": "toronto",
                "name": "City of Toronto Neigbhourhood Watch",
                "absoluteUrl": "http://toronto."+process.env.REACT_APP_DOMAIN+"/dashboard"
            }
        ];
        return (
            <SharedOrganizationListComponent
                tableData={sampleData}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // device: store.deviceState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (successCallback, failureCallback) => {
            dispatch(pullProfile(successCallback, failureCallback))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationListContainer);
