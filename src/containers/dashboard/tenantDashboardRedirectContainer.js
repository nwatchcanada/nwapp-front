import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../actions/profileAction";
import TenantRedirectComponent from "../../components/dashboard/tenantRedirectComponent";
import { setAccessTokenInLocalStorage, setRefreshTokenInLocalStorage } from '../../helpers/tokenUtility';


class TenantDashboardRedirectContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the arguments as follows.
        const { accessToken, refreshToken } = this.props.match.params;

        this.state = {
            referrer: '',
            accessTokenString: accessToken,
            refreshTokenString: refreshToken
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

        // Defensive code: If we don't have the details then don't run this
        // function in our code.
        const { accessTokenString, refreshTokenString } = this.state;
        if (accessTokenString === undefined || accessTokenString === null) {
            alert("NULL TOKEN DETECTED.");
            return;
        }

        // IMPORTANT: WE ARE TAKING THE ACCESS TOKEN FOUND AS A URL ARGUMENT
        // AND INSERTING IT INTO OUR TOKEN-UTILITY LIBRARY SO ALL OUR API
        // NOW CAN USE IT AND WE HAVE ACCESS TO THE TENANTED API DATA.
        setAccessTokenInLocalStorage({
            'token': accessTokenString
        });

        // IMPORTANT: WE NEED TO SAVE THE REFRESH TOKEN AS WELL!
        setRefreshTokenInLocalStorage({
            'token': refreshTokenString
        });

        // IMPORTANT: NOW THAT WE HAVE ATTACHED OUR ACCESS TOKEN TO OUR LOCAL
        // STORAGE, WE CAN NOW MAKE API CALLS.
        this.props.pullProfile(this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/dashboard"
        })
    }

    onFailedSubmissionCallback() {
        // Do nothing.
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
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to="/dashboard" />
        }
        return (
            <TenantRedirectComponent />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        onboarding: store.onboardingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (successCallback, failureCallback) => {
            dispatch(pullProfile(successCallback, failureCallback))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TenantDashboardRedirectContainer);
