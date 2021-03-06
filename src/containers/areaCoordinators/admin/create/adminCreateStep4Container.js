import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminAreaCoordinatorCreateStep4Component from "../../../../components/areaCoordinators/admin/create/adminCreateStep4Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postMemberPromoteOperation } from "../../../../actions/memberActions";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem,
    localStorageRemoveItemsContaining
} from "../../../../helpers/localStorageUtility";


class AdminAreaCoordinatorPromoteOperationStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            slug: localStorage.getItem("nwapp-areaCoordinator-add-member"),
            errors: [],
            roleId: localStorageGetIntegerItem("nwapp-areaCoordinator-add-roleId"),
            memberSlug: localStorage.getItem("nwapp-areaCoordinator-add-member"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-confidentialityAgreement"),
            associateAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-associateAgreement"),
            staffAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-add-staffAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-areaCoordinator-add-policeCheckDate"),
            isLoading: false,
        }

        this.onClick = this.onClick.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (1) AreaCoordinator
        postData.member = this.state.memberSlug;

        // (2) Police Check Date
        const policeCheckDateMoment = moment(this.state.policeCheckDate);
        postData.policeCheckDate = policeCheckDateMoment.format("YYYY-MM-DD")

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

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
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(areaCoordinator) {
        this.setState({ errors: {}, isLoading: true, })
        localStorageRemoveItemsContaining("nwapp-areaCoordinator-add-");
        this.props.setFlashMessage("success", "Member has been successfully promoted to area coordinator.");
        this.props.history.push("/admin/area-coordinator/"+this.state.slug+"");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false,
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({
            isLoading: true,
            errors: [],
        });

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.postMemberPromoteOperation(
            this.getPostData(),
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAreaCoordinatorCreateStep4Component
                slug={this.state.slug}
                areaCoordinator={this.props.areaCoordinator}
                roleId={this.state.roleId}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                conflictOfInterestAgreement={this.state.conflictOfInterestAgreement}
                codeOfConductAgreement={this.state.codeOfConductAgreement}
                confidentialityAgreement={this.state.confidentialityAgreement}
                associateAgreement={this.state.associateAgreement}
                policeCheckDate={this.state.policeCheckDate}
                errors={this.state.errors}
                onBack={this.onBack}
                onClick={this.onClick}
                isLoading={this.state.isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        areaCoordinator: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postMemberPromoteOperation: (postData, successCallback, failedCallback) => {
            dispatch(postMemberPromoteOperation(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorPromoteOperationStep4Container);
