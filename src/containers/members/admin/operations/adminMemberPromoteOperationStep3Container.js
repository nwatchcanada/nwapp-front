import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { AREA_COORDINATOR_ROLE_ID, ASSOCIATE_ROLE_ID } from "../../../../constants/api";
import MemberPromoteStep3Component from "../../../../components/members/admin/operations/memberPromoteStep3Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem
} from "../../../../helpers/localStorageUtility";


class AdminMemberPromoteOperationStep2Container extends Component {
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
            roleId: localStorageGetIntegerItem("nwapp-member-promote-group-id"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-member-promote-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-member-promote-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-member-promote-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-member-promote-confidentialityAgreement"),
            associateAgreement: localStorageGetBooleanItem("nwapp-member-promote-associateAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-member-promote-policeCheckDate"),
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onSuccessfulSubmissionCallback(member) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Member has been successfully created.");
        this.props.history.push("/members");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

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
        })
        this.props.setFlashMessage("success", "Member has been successfully promoted.");
        if (this.state.roleId === AREA_COORDINATOR_ROLE_ID) {
            this.props.history.push("/area-coordinator/"+this.state.slug+"/full");
        }
        else if (this.state.roleId === ASSOCIATE_ROLE_ID) {
            this.props.history.push("/associate/"+this.state.slug+"/full");
        } else {
            this.props.history.push("/member/"+this.state.slug+"/full");
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const memberData = {
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/member/argyle'
        };
        return (
            <MemberPromoteStep3Component
                slug={this.state.slug}
                memberData={memberData}
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
            />
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberPromoteOperationStep2Container);
