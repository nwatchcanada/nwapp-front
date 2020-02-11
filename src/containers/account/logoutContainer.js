
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Scroll from 'react-scroll';

import TenantRedirectComponent from "../../components/dashboard/tenantRedirectComponent";
import { postLogout, attemptLogout } from "../../actions/logoutAction";
import { setFlashMessage } from "../../actions/flashMessageActions";
import { APP_STATE } from "../../constants/redux";


class LogoutContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: true
        }
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        const { user } = this.props;
        if (user !== undefined && user.accessToken !== undefined && user.accessToken !== null) {
            // DEVELOPERS NOTE:
            // Regardless of any server related errors, the client browser will
            // automatically clear the storage pertaining to the user session.
            this.props.postLogout( // Call the API endpoint to log out.
                this.props.user,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        } else {
            // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
            localStorage.removeItem(APP_STATE) // Clear the state data of the app.
            localStorage.clear(); // Clear any remaining items.

            this.props.setFlashMessage("success", "You have successfully logged out.");
            this.setState({
                isLoading: false,
            })
        }
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(member) {
        // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
        localStorage.removeItem(APP_STATE) // Clear the state data of the app.
        localStorage.clear(); // Clear any remaining items.

        // Create a flash message telling the user that they successfully logged out.
        this.props.setFlashMessage("success", "You have successfully logged out.");

        // Tell the state that we've successfully finished loading this page
        // as a result we will redirect to the login page.
        this.setState({
            isLoading: false,
        });
    }

    onFailedSubmissionCallback(errors) {
        // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
        localStorage.removeItem(APP_STATE) // Clear the state data of the app.
        localStorage.clear(); // Clear any remaining items.

        // Create a flash message telling the user that they successfully logged out.
        this.props.setFlashMessage("success", "You have successfully logged out.");

        // Tell the state that we've successfully finished loading this page
        // as a result we will redirect to the login page.
        this.setState({
            isLoading: false,
        });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    // Nothing...

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, errors } = this.state;
        if (isLoading) {
            return (
                <TenantRedirectComponent errors={errors} />
            );
        } else {
            return <Redirect to="/login" />;
        }

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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postLogout: (user, onSuccessCallback, onFailureCallback) => {
            dispatch(postLogout(user, onSuccessCallback, onFailureCallback))
        },
        attemptLogout: () => {
            dispatch(attemptLogout())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer);
