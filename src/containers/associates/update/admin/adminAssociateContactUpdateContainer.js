import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminAssociateContactUpdateComponent from "../../../../components/associates/update/admin/adminAssociateContactUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateContactInput } from "../../../../validators/associateValidator";
// import { putAssociateContactDetail } from "../../../../actions/associateActions";


class AdminAssociateContactUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // // Map the API fields to our fields.
        // const isOkToEmail = this.props.associateDetail.isOkToEmail === true ? 1 : 0;
        // const isOkToText = this.props.associateDetail.isOkToText === true ? 1 : 0;

        this.state = {
            // // STEP 3
            // typeOf: this.props.associateDetail.typeOf,
            //
            // // STEP 4
            // organizationName: this.props.associateDetail.organizationName,
            // organizationTypeOf: this.props.associateDetail.organizationTypeOf,
            // givenName: this.props.associateDetail.givenName,
            // lastName: this.props.associateDetail.lastName,
            // primaryPhone: this.props.associateDetail.telephone,
            // primaryPhoneTypeOf: this.props.associateDetail.telephoneTypeOf,
            // secondaryPhone: this.props.associateDetail.otherTelephone,
            // secondaryPhoneTypeOf: this.props.associateDetail.otherTelephoneTypeOf,
            // email: this.props.associateDetail.email,
            // isOkToEmail: isOkToEmail,
            // isOkToText: isOkToText,
            //
            // // Everything else...
            // errors: {},
            // isLoading: false,
            slug: slug,
            // fullName: this.props.associateDetail.fullName,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

        // (2) Middle name (API ISSUE)
        postData.middleName = this.state.middleName;

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

        const duesDateMoment = moment(this.state.duesDate);
        postData.duesDate = duesDateMoment.format("YYYY-MM-DD");

        const commercialInsuranceExpiryDateMoment = moment(this.state.commercialInsuranceExpiryDate);
        postData.commercialInsuranceExpiryDate = commercialInsuranceExpiryDateMoment.format("YYYY-MM-DD");

        const autoInsuranceExpiryDateMoment = moment(this.state.autoInsuranceExpiryDate);
        postData.autoInsuranceExpiryDate = autoInsuranceExpiryDateMoment.format("YYYY-MM-DD");

        const wsibInsuranceDateMoment = moment(this.state.wsibInsuranceDatej);
        postData.wsibInsuranceDate = wsibInsuranceDateMoment.format("YYYY-MM-DD");

        const policeCheckMoment = moment(this.state.policeCheckj);
        postData.policeCheck = policeCheckMoment.format("YYYY-MM-DD");

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

        // (6) Organization Type Of - This field may not be null, therefore make blank.
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        // (7) Extra Comment: This field is required.
        if (this.state.comment === undefined || this.state.comment === null) {
            postData.extraComment = "";
        } else {
            postData.extraComment = this.state.comment;
        }

        // (8) Telephone type: This field is required.;
        postData.telephone = this.state.primaryPhone;
        if (this.state.telephoneTypeOf === undefined || this.state.telephoneTypeOf === null || this.state.telephoneTypeOf === "") {
            postData.telephoneTypeOf = 1;
        }
        postData.otherTelephone = this.state.secondaryPhone;
        if (this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === "") {
            postData.otherTelephoneTypeOf = 1;
        }

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        postData.isActive = true;

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
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Associate has been successfully updated.");
        this.props.history.push("/associate/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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
        // ContactUpdate our state.
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-associate-"+[e.target.name];
        const storageLabelKey =  "workery-create-associate-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ [storeLabelKey]: label, }); // Save to store.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateContactInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // this.setState({ errors: {}, isLoading: true}, ()=>{
            //     this.props.putAssociateContactDetail(
            //         this.getPostData(),
            //         this.onSuccessfulSubmissionCallback,
            //         this.onFailedSubmissionCallback
            //     );
            // });

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
        const {
            // Step 3
            typeOf,

            // Step 4
            organizationName, organizationTypeOf, givenName, lastName, primaryPhone, secondaryPhone, email, isOkToEmail, isOkToText,

            // Everything else...
            errors, slug, fullName, isLoading,
        } = this.state;
        return (
            <AdminAssociateContactUpdateComponent
                // Step 3
                typeOf={typeOf}

                // Step 4
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                givenName={givenName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}

                // Everything else...
                slug={slug}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onVehicleTypeMultiChange={this.onVehicleTypeMultiChange}
                onInsuranceRequirementMultiChange={this.onInsuranceRequirementMultiChange}
                onSkillSetMultiChange={this.onSkillSetMultiChange}
                onTagMultiChange={this.onTagMultiChange}
                onClick={this.onClick}
                fullName={fullName}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        // putAssociateContactDetail: (data, onSuccessCallback, onFailureCallback) => {
        //     dispatch(
        //         putAssociateContactDetail(data, onSuccessCallback, onFailureCallback)
        //     )
        // },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateContactUpdateContainer);
