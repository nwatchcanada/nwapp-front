import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    AREA_COORDINATOR_ROLE_ID,
    MEMBER_ROLE_ID
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
            isLoading: true,
        }

        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        this.props.pullProfile(this.onSuccessCallback, this.onFailureCallback);
        this.props.pullDashboard(getSubdomain(), this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ errors: [], isLoading: false, });
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
        this.setState({ errors: errors, isLoading: true, });

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
        const { isLoading, errors } = this.state;
        const dashboardData = isEmpty(this.props.dashboard) ? {} : this.props.dashboard;

        const { roleId } = this.props.user;

        if (roleId === EXECUTIVE_ROLE_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={dashboardData}
                    isLoading={isLoading}
                    errors={errors}
                />
            );
        }
        else if (roleId === MANAGEMENT_ROLE_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={this.props.dashboard}
                    isLoading={isLoading}
                    errors={errors}
                />
            );
        }
        else if (roleId === FRONTLINE_STAFF_ROLE_ID) {
            return (
                <StaffDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={this.props.dashboard}
                    isLoading={isLoading}
                    errors={errors}
                />
            );
        }
        else if (roleId === ASSOCIATE_ROLE_ID) {
            return (
                <AssociateDashboardComponent
                    user={this.props.user}
                    dashboardData={this.props.dashboard}
                    isLoading={isLoading}
                    errors={errors}
                />
            );
        }
        else if (roleId === AREA_COORDINATOR_ROLE_ID) {
            return (
                <AreaCoordinatorDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={this.props.dashboard}
                    isLoading={isLoading}
                    errors={errors}
                />
            );
        }
        else if (roleId === MEMBER_ROLE_ID) {
            return (
                <MemberDashboardComponent
                    // dashboard={this.props.dashboard}
                    user={this.props.user}
                    dashboardData={this.props.dashboard}
                    isLoading={isLoading}
                    errors={errors}
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
