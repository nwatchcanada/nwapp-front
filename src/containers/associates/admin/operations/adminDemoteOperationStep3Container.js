import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import {
    MEMBER_ROLE_ID, AREA_COORDINATOR_ROLE_ID, ASSOCIATE_ROLE_ID
 } from "../../../../constants/api";
import AssociateDemoteStep3Component from "../../../../components/associates/admin/operations/adminDemoteOperationStep3Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postAssociateDemoteOperation } from "../../../../actions/associateActions";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem,
    localStorageRemoveItemsContaining
} from "../../../../helpers/localStorageUtility";


class AdminAssociateDemoteOperationStep3Container extends Component {
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
            roleId: localStorageGetIntegerItem("nwapp-associate-demote-group-id"),
            reason: localStorageGetIntegerItem("nwapp-associate-demote-reason"),
            reasonOther: localStorage.getItem("nwapp-associate-demote-reasonOther"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-associate-demote-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-associate-demote-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-associate-demote-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-associate-demote-confidentialityAgreement"),
            associateAgreement: localStorageGetBooleanItem("nwapp-associate-demote-associateAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-associate-demote-policeCheckDate"),
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

        // (1) Associate
        postData.associate = this.state.slug;

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

    onSuccessfulSubmissionCallback(associate) {
        localStorageRemoveItemsContaining("nwapp-associate-demote-");
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Associate has been successfully demoted.");
        if (this.state.roleId === AREA_COORDINATOR_ROLE_ID) {
            this.props.history.push("/admin/area-coordinator/"+this.state.slug+"/full");
        }
        else if (this.state.roleId === ASSOCIATE_ROLE_ID) {
            this.props.history.push("/admin/associate/"+this.state.slug+"");
        } else if (this.state.roleId === MEMBER_ROLE_ID) {
            this.props.history.push("/admin/member/"+this.state.slug+"");
        } else {
            this.props.history.push("/admin/associate/"+this.state.slug+"");
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
        this.props.postAssociateDemoteOperation(
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
            <AssociateDemoteStep3Component
                slug={this.state.slug}
                associate={this.props.associate}
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
        associate: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postAssociateDemoteOperation: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateDemoteOperation(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateDemoteOperationStep3Container);
