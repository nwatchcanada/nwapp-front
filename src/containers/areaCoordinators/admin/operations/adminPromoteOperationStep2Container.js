import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorPromoteOperationStep2Component from "../../../../components/areaCoordinators/admin/operations/adminPromoteOperationStep2Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validatePromotionInput } from "../../../../validators/areaCoordinatorValidator";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem,
    localStorageSetObjectOrArrayItem
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
            policeCheckDate: localStorageGetDateItem("nwapp-areaCoordinator-promote-policeCheckDate"),
        }

        this.onClick = this.onClick.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
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

    onSuccessfulSubmissionCallback(areaCoordinator) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/admin/areaCoordinator/"+this.state.slug+"/promote/step-3");
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

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('nwapp-areaCoordinator-promote-'+[e.target.name], e.target.checked);
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState({
            policeCheckDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-areaCoordinator-promote-policeCheckDate', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validatePromotionInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAreaCoordinatorPromoteOperationStep2Component
                roleId={this.state.roleId}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                conflictOfInterestAgreement={this.state.conflictOfInterestAgreement}
                codeOfConductAgreement={this.state.codeOfConductAgreement}
                confidentialityAgreement={this.state.confidentialityAgreement}
                associateAgreement={this.state.associateAgreement}
                policeCheckDate={this.state.policeCheckDate}
                errors={this.state.errors}
                slug={this.state.slug}
                areaCoordinator={this.props.areaCoordinator}
                onBack={this.onBack}
                onClick={this.onClick}
                onCheckboxChange={this.onCheckboxChange}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorPromoteOperationStep2Container);
