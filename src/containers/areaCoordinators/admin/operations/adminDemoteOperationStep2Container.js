import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorDemoteOperationStep2Component from "../../../../components/areaCoordinators/admin/operations/adminDemoteOperationStep2Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateDemotionInput } from "../../../../validators/areaCoordinatorValidator";
import {
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageGetDateItem,
    localStorageSetObjectOrArrayItem
} from "../../../../helpers/localStorageUtility";
import { DEMOTION_REASON_CHOICES } from "../../../../constants/api";


class AdminAreaCoordinatorDemoteOperationStep2Container extends Component {
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
            roleId: localStorageGetIntegerItem("nwapp-areaCoordinator-demote-group-id"),
            reason: localStorageGetIntegerItem("nwapp-areaCoordinator-demote-reason"),
            reasonOptions: DEMOTION_REASON_CHOICES,
            reasonOther: localStorage.getItem("nwapp-areaCoordinator-demote-reasonOther"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-demote-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-demote-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-demote-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-demote-confidentialityAgreement"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-areaCoordinator-demote-areaCoordinatorAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-areaCoordinator-demote-policeCheckDate"),
        }

        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        this.props.history.push("/admin/area-coordinator/"+this.state.slug+"/demote/step-3");
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
        localStorage.setItem('nwapp-areaCoordinator-demote-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-areaCoordinator-demote-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-areaCoordinator-demote-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-areaCoordinator-demote-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('nwapp-areaCoordinator-demote-'+[e.target.name], e.target.checked);
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState({
            policeCheckDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-areaCoordinator-demote-policeCheckDate', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateDemotionInput(this.state);

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
            <AdminAreaCoordinatorDemoteOperationStep2Component
                roleId={this.state.roleId}
                reason={this.state.reason}
                reasonOptions={this.state.reasonOptions}
                reasonOther={this.state.reasonOther}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                conflictOfInterestAgreement={this.state.conflictOfInterestAgreement}
                codeOfConductAgreement={this.state.codeOfConductAgreement}
                confidentialityAgreement={this.state.confidentialityAgreement}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                policeCheckDate={this.state.policeCheckDate}
                errors={this.state.errors}
                slug={this.state.slug}
                areaCoordinator={this.props.areaCoordinator}
                onBack={this.onBack}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onCheckboxChange={this.onCheckboxChange}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}
                areaCoordinator={this.props.areaCoordinator}
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
)(AdminAreaCoordinatorDemoteOperationStep2Container);
