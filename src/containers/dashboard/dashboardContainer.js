import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    EXECUTIVE_GROUP_ID,
    MANAGEMENT_GROUP_ID,
    FRONTLINE_STAFF_GROUP_ID,
    ASSOCIATE_GROUP_ID,
    AREA_COORDINATOR_GROUP_ID,
    MEMBER_GROUP_ID
} from '../../constants/api';
import StaffDashboardComponent from "../../components/dashboard/staffDashboardComponent";
import AssociateDashboardComponent from "../../components/dashboard/associateDashboardComponent";
import AreaCoordinatorDashboardComponent from "../../components/dashboard/areaCoordinatorDashboardComponent";
import MemberDashboardComponent from "../../components/dashboard/memberDashboardComponent";
import { pullProfile } from "../../actions/profileAction";
import { pullDashboard } from "../../actions/dashboardActions";
import { getSubdomain } from '../../helpers/urlUtility';


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
        this.props.pullProfile(this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        this.props.pullDashboard(getSubdomain(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        const dashboardData = {
            latestTasks: [
                {
                    'slug': 'Argyle',
                    'number': 1,
                    'name': 'Argyle',
                    'absoluteUrl': '/item/argyle'
                },{
                    'slug': 'byron',
                    'number': 2,
                    'name': 'Byron',
                    'absoluteUrl': '/item/byron'
                },{
                    'slug': 'carling',
                    'number': 3,
                    'name': 'Carling',
                    'absoluteUrl': '/item/carling'
                }
            ]
        };
        const { groupMembershipId } = this.props.user;
        if (groupMembershipId === EXECUTIVE_GROUP_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                />
            );
        }
        else if (groupMembershipId === MANAGEMENT_GROUP_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                />
            );
        }
        else if (groupMembershipId === FRONTLINE_STAFF_GROUP_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                />
            );
        }
        else if (groupMembershipId === ASSOCIATE_GROUP_ID) {
            return (
                <AssociateDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                />
            );
        }
        else if (groupMembershipId === AREA_COORDINATOR_GROUP_ID) {
            return (
                <AreaCoordinatorDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                />
            );
        }
        else if (groupMembershipId === MEMBER_GROUP_ID) {
            return (
                <MemberDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                />
            );
        } else {
            return null;
        }
    };
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        dashboard: store.dashboardState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (successCallback, failureCallback) => {
            dispatch(pullProfile(successCallback, failureCallback))
        },
        pullDashboard: (schema, successCallback, failureCallback) => {
            dispatch(pullDashboard(schema, successCallback, failureCallback))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
