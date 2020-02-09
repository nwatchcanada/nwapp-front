import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationCreateStep2Component from "../../../../components/organizations/shared/create/sharedOrganizationCreateStep2Component";
import validateInput from '../../../../validators/organizationValidator';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { getTimezoneReactSelectOptions } from "../../../../helpers/timezoneUtlity";
import { postTenantDetail } from "../../../../actions/tenantActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


class SharedOrganizationCreateStep2Container extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            schema: localStorage.getItem("nwapp-create-tenant-schema"),
            name: localStorage.getItem("nwapp-create-tenant-name"),
            alternateName: localStorage.getItem("nwapp-create-tenant-alternateName"),
            description: localStorage.getItem("nwapp-create-tenant-description"),
            country: localStorage.getItem("nwapp-create-tenant-country"),
            province: localStorage.getItem("nwapp-create-tenant-province"),
            city: localStorage.getItem("nwapp-create-tenant-city"),
            streetNumber: localStorage.getItem("nwapp-create-tenant-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-tenant-streetName"),
            streetType: localStorageGetIntegerItem("nwapp-create-tenant-streetType"),
            streetTypeLabel: localStorage.getItem("nwapp-create-tenant-streetTypeLabel"),
            apartmentUnit: localStorage.getItem("nwapp-create-tenant-apartmentUnit"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-tenant-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-tenant-streetTypeOther"),
            streetDirection: localStorageGetIntegerItem("nwapp-create-tenant-streetDirection"),
            streetDirectionLabel: localStorage.getItem("nwapp-create-tenant-streetDirectionLabel"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-tenant-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-tenant-postalCode"),
            timezone: 'America/Toronto',
            errors: {},
            isLoading: false,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onProvinceChange = this.onProvinceChange.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onProvinceChange = this.onProvinceChange.bind(this);
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
        this.setState = (state,callback)=>{ return; };
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // Alternate Name: This field is required.
        //
        // Timezone Name: This field is required.
        postData.timezoneName = this.state.timezone;

        // Street Address: This field is required.
        postData.addressCountry = this.state.country;

        // Address Province: This field is required.
        postData.addressProvince = this.state.province

        // Address City: This field is required.
        postData.addressCity = this.state.city;

        // Street Direction: Cannot be NaN.
        if (isNaN(this.state.streetDirection)) {
            postData.streetDirection = 0;
        }

        // Postal Code: This field is required.
        postData.postalCode = this.state.postalCode;

        // Schema Name: This field is required.
        postData.schemaName = this.state.schema;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "Organization has been successfully created.");
        this.props.history.push("/organization/add-success");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
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
        });
        localStorage.setItem('nwapp-create-tenant-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorageSetObjectOrArrayItem('nwapp-create-tenant-'+optionKey, option);
    }

    onBackClick() {
        this.props.history.push("/organization/add/step-1");
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, province: null })
        } else {
            this.setState({ country: value, province: null })
        }
        localStorage.setItem('nwapp-create-tenant-country', value);
    }

    onProvinceChange(value) {
        this.setState({ province: value });
        localStorage.setItem('nwapp-create-tenant-province', value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=> {
                this.props.postTenantDetail(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                );
            });

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
            schema, name, alternateName, description, country, province, city,
            streetNumber, streetName, streetType, streetTypeLabel, apartmentUnit, streetTypeOther, streetDirection, streetDirectionLabel, postalCode,
            timezone, errors, isLoading
        } = this.state;
        return (
            <SharedOrganizationCreateStep2Component
                schema={schema}
                name={name}
                alternateName={alternateName}
                description={description}
                country={country}
                province={province}
                city={city}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeLabel={streetTypeLabel}
                apartmentUnit={apartmentUnit}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionLabel={streetDirectionLabel}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                postalCode={postalCode}
                timezone={timezone}
                timezoneOptions={getTimezoneReactSelectOptions()}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onCountryChange={this.onCountryChange}
                onProvinceChange={this.onProvinceChange}
                onBackClick={this.onBackClick}
                onCountryChange={this.onCountryChange}
                onProvinceChange={this.onProvinceChange}
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
        postTenantDetail: (postData, successCallback, errorCallback) => {
            dispatch(
                postTenantDetail(postData, successCallback, errorCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationCreateStep2Container);
