import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminAreaCoordinatorContactUpdateComponent from "../../../../components/areaCoordinators/admin/update/adminContactUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateContactInput } from "../../../../validators/areaCoordinatorValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../../constants/api';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../../actions/howHearActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import { putAreaCoordinatorContactDetail } from "../../../../actions/areaCoordinatorActions";


class AdminAreaCoordinatorContactUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Map the API fields to our fields.
        const isOkToEmail = this.props.areaCoordinatorDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.areaCoordinatorDetail.isOkToText === true ? 1 : 0;

        this.state = {
            errors: {},
            isLoading: false,
            slug: slug,

            // STEP 3
            typeOf: this.props.areaCoordinatorDetail.typeOf,

            // STEP 4
            organizationName: this.props.areaCoordinatorDetail.organizationName,
            organizationTypeOf: this.props.areaCoordinatorDetail.organizationTypeOf,
            firstName: this.props.areaCoordinatorDetail.firstName,
            lastName: this.props.areaCoordinatorDetail.lastName,
            organizationName: this.props.areaCoordinatorDetail.organizationName,
            organizationTypeOf: this.props.areaCoordinatorDetail.organizationTypeOf,
            firstName: this.props.areaCoordinatorDetail.firstName,
            lastName: this.props.areaCoordinatorDetail.lastName,
            primaryPhone: this.props.areaCoordinatorDetail.primaryPhoneNational,
            primaryPhoneTypeOf: this.props.areaCoordinatorDetail.primaryPhoneTypeOf,
            secondaryPhone: this.props.areaCoordinatorDetail.secondaryPhoneNational,
            secondaryPhoneTypeOf: this.props.areaCoordinatorDetail.secondaryPhoneTypeOf,
            email: this.props.areaCoordinatorDetail.email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailedCallback = this.onFailedCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (6) Organization Type Of - This field may not be null, therefore make blank.
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        if (this.state.organizationName === undefined || this.state.organizationName === null) {
            postData.organizationName = "";
        }

        // (8) Telephone type: This field is required.;
        if (this.state.primaryPhoneTypeOf === undefined || this.state.primaryPhoneTypeOf === null || this.state.primaryPhoneTypeOf === "") {
            postData.primaryPhoneTypeOf = 1;
        }
        if (this.state.secondaryPhoneTypeOf === undefined || this.state.secondaryPhoneTypeOf === null || this.state.secondaryPhoneTypeOf === "") {
            postData.secondaryPhoneTypeOf = 1;
        }

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

        // Fetch all our GUI drop-down options which are populated by the API.
        this.props.pullHowHearList(1,1000);
        this.props.pullTagList(1,1000);
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

    onSuccessCallback(areaCoordinator) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Area coordinator has been successfully updated.");
        this.props.history.push("/admin/area-coordinator/"+this.state.slug+"/full");
    }

    onFailedCallback(errors) {
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
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform areaCoordinator-side validation.
        const { errors, isValid } = validateContactInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putAreaCoordinatorContactDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailedCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-areaCoordinator-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, slug, isLoading,

            // STEP 3
            typeOf,

            // STEP 4 - REZ
            firstName, lastName, primaryPhone, primaryPhoneTypeOf, secondaryPhone, secondaryPhoneTypeOf, email, isOkToText, isOkToEmail,

            // STEP 4 - BIZ
            organizationName, organizationTypeOf,
        } = this.state;

        return (
            <AdminAreaCoordinatorContactUpdateComponent
                // STEP 3
                typeOf={typeOf}

                // STEP 4
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                primaryPhoneTypeOf={primaryPhoneTypeOf}
                secondaryPhone={secondaryPhone}
                secondaryPhoneTypeOf={secondaryPhoneTypeOf}
                email={email}
                isOkToText={isOkToText}
                isOkToEmail={isOkToEmail}

                // EVERYTHING ELSE
                isLoading={isLoading}
                slug={slug}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
        howHearList: store.howHearListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putAreaCoordinatorContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putAreaCoordinatorContactDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorContactUpdateContainer);
