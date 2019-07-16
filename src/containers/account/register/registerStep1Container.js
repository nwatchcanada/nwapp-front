import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterStep1Component from "../../../components/account/register/registerStep1Component";
import { getSubdomain } from '../../../helpers/urlUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class RegisterStep1Container extends Component {
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

        // Check if we are in a tenant or not.
        const subdomain = getSubdomain();
        const isTenant = subdomain !== null && subdomain !== undefined;

        // If we are not tenant then redirect out.
        if (isTenant === false) {
            this.props.setFlashMessage("danger", "Please register under an organization subdomain.");
            this.props.history.push("/");
        }
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <RegisterStep1Component
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterStep1Container);
