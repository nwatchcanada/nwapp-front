import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffDashboardComponent from "../../components/dashboard/staffDashboardComponent";
import { pullProfile } from "../../actions/profileAction";
// import { pullDashboard } from "../../actions/dashboardActions";


class DashboardContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        this.props.pullProfile(this.props.user, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        const { groupMembershipId } = this.props.user
        return (
            <StaffDashboardComponent
                // dashboard={this.props.dashboard}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // dashboard: store.dashboardState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user, successCallback, failureCallback) => {
            dispatch(pullProfile(user, successCallback, failureCallback))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
