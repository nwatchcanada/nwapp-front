
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

// import LogoutComponent from '../../components/account/logoutComponent';
import { postLogout, attemptLogout } from "../../actions/logoutAction";
import { setFlashMessage } from "../../actions/flashMessageActions";


class LogoutContainer extends Component {
    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount() {
        // When this component loads up, we want to clear any previous errors
        // returned in the state so do so now.
        if (this.props.user.errors !== undefined && this.props.user.errors !== null) {
            var keyCount = Object.keys(this.props.user.errors).length;
            if (keyCount > 0) {
                // this.props.attemptLoginRestForm();
            }
        }
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        const { user } = this.props;
        if (user !== undefined && user.token !== undefined && user.token !== null) {
            // Call the API endpoint to log out.
            this.props.postLogout(this.props.user);

            // CLEAR THE LOCAL STORAGE IF WE SUCCESSFULLY LOGGED OUT!
            localStorage.clear();

            // Create a flash message telling the user that they successfully logged out.
            this.props.setFlashMessage("success", "You have successfully logged out.");
            this.props.attemptLogout();

        }
        return <Redirect to="/login" />;
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
        postLogout: (user) => {
            dispatch(postLogout(user))
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
