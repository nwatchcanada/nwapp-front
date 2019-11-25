import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminMemberLiteRetrieveComponent from "../../../../components/members/admin/retrieve/adminMemberLiteRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullMemberDetail } from '../../../../actions/memberActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminMemberLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const member = localStorageGetObjectItem("workery-admin-retrieve-member-"+slug.toString() );
        const isLoading = isEmpty(member);

        // Update state.
        this.state = {
            slug: slug,
            member: member,
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
        this.props.pullMemberDetail(
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
    //     localStorage.setItem("workery-create-order-clientId", this.props.clientDetail.id);
    //     localStorage.setItem("workery-create-order-clientGivenName", this.props.clientDetail.givenName);
    //     localStorage.setItem("workery-create-order-clientLastName", this.props.clientDetail.lastName);
    //     this.props.history.push("/orders/add/step-3");
    // }

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ isLoading: false, member: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("workery-admin-retrieve-member-"+this.state.slug.toString(), response);
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
        const member = isEmpty(this.state.member) ? {} : this.state.member;
        return (
            <AdminMemberLiteRetrieveComponent
                slug={slug}
                member={member}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        member: store.memberState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullMemberDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullMemberDetail(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberLiteRetrieveContainer);
