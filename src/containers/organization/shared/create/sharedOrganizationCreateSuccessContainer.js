import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationCreateSuccessComponent from "../../../../components/organizations/shared/create/sharedOrganizationCreateSuccessComponent";
import validateInput from '../../../../validators/organizationValidator';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../../helpers/timezoneUtlity";
import { postTenantDetail } from "../../../../actions/tenantActions";


class SharedOrganizationCreateContainer extends Component {

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
        this.setState = (state,callback)=>{ return; };
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
            <SharedOrganizationCreateSuccessComponent />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postTenantDetail: (postData, successCallback, errorCallback) => {
            dispatch(
                postTenantDetail(postData, successCallback, errorCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationCreateContainer);
