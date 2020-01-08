import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import {
    AREA_COORDINATOR_ROLE_ID, ASSOCIATE_ROLE_ID, FRONTLINE_STAFF_ROLE_ID, MANAGEMENT_ROLE_ID
} from "../../../../constants/api";
import AreaCoordinatorPromoteStep3Component from "../../../../components/areaCoordinators/admin/operations/adminPromoteOperationStep3Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postAreaCoordinatorPromoteOperation } from "../../../../actions/areaCoordinatorActions";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem
} from "../../../../helpers/localStorageUtility";


class AdminAreaCoordinatorPromoteOperationStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            errors: [],
            roleId: localStorageGetIntegerItem("nwapp-areaCoordinator-promote-group-id"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-confidentialityAgreement"),
            associateAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-associateAgreement"),
            staffAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-promote-staffAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-areaCoordinator-promote-policeCheckDate"),
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
        postData.areaCoordinator = this.state.slug;

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
        if (this.state.roleId === ASSOCIATE_ROLE_ID) {
            this.props.setFlashMessage("success", "Area coordinator has been successfully promoted to associate.");
            this.props.history.push("/admin/associate/"+this.state.slug+"");
        } else if (this.state.roleId === FRONTLINE_STAFF_ROLE_ID) {
            this.props.setFlashMessage("success", "Area coordinator has been successfully promoted to frontline staff.");
            this.props.history.push("/admin/staff/"+this.state.slug+"");
        } else if (this.state.roleId === MANAGEMENT_ROLE_ID) {
            this.props.setFlashMessage("success", "Area coordinator has been successfully promoted to management staff.");
            this.props.history.push("/admin/staff/"+this.state.slug+"");
        }
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
        this.props.postAreaCoordinatorPromoteOperation(
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
            <AreaCoordinatorPromoteStep3Component
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
        postAreaCoordinatorPromoteOperation: (postData, successCallback, failedCallback) => {
            dispatch(postAreaCoordinatorPromoteOperation(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorPromoteOperationStep2Container);
