import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminStaffLiteRetrieveComponent from "../../../../components/staffs/admin/retrieve/adminLiteRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullStaffDetail } from '../../../../actions/staffActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminStaffLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const staff = localStorageGetObjectItem("nwapp-admin-retrieve-staff-"+slug.toString() );
        const isLoading = isEmpty(staff);

        // Update state.
        this.state = {
            slug: slug,
            staff: staff,
            isLoading: isLoading,
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        // this.onClientClick = this.onClientClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullStaffDetail(
            this.state.slug,
            this.onSuccessCallback,
            this.onFailureCallback
        );
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

    // onClientClick(e) {
    //     e.preventDefault();
    //     localStorage.setItem("nwapp-create-order-clientId", this.props.clientDetail.id);
    //     localStorage.setItem("nwapp-create-order-clientGivenName", this.props.clientDetail.givenName);
    //     localStorage.setItem("nwapp-create-order-clientLastName", this.props.clientDetail.lastName);
    //     this.props.history.push("/orders/add/step-3");
    // }

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ isLoading: false, staff: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-staff-"+this.state.slug.toString(), response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
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
        const { slug, isLoading } = this.state;
        const staff = isEmpty(this.state.staff) ? {} : this.state.staff;
        return (
            <AdminStaffLiteRetrieveComponent
                slug={slug}
                staff={staff}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        staff: store.staffDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullStaffDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullStaffDetail(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStaffLiteRetrieveContainer);
