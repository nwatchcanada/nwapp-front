import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationCreateStep1Component from "../../../../components/organizations/shared/create/sharedOrganizationCreateStep1Component";
import validateInput from '../../../../validators/organizationValidator';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { getTimezoneReactSelectOptions } from "../../../../helpers/timezoneUtlity";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


class SharedOrganizationCreateStep1Container extends Component {

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
            apartmentUnit: localStorage.getItem("nwapp-create-tenant-apartmentUnit"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-tenant-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-tenant-streetTypeOther"),
            streetDirection: localStorageGetIntegerItem("nwapp-create-tenant-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-tenant-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-tenant-postalCode"),
            latitude: localStorage.getItem("nwapp-create-tenant-latitude"),
            longitude: localStorage.getItem("nwapp-create-tenant-longitude"),
            zoom: localStorage.getItem("nwapp-create-tenant-zoom"),
            timezone: 'America/Toronto',
            errors: {},
            isLoading: false,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        localStorage.setItem('nwapp-create-tenant-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-tenant-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-tenant-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onBackClick() {
        this.props.history.push("/organizations");
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
            this.props.history.push("/organization/add/step-2");

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
            streetNumber, streetName, streetType, apartmentUnit, streetTypeOther,
            streetDirection, postalCode, latitude, longitude, zoom,
            timezone, errors, isLoading
        } = this.state;
        return (
            <SharedOrganizationCreateStep1Component
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
                apartmentUnit={apartmentUnit}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                postalCode={postalCode}
                latitude={latitude}
                longitude={longitude}
                zoom={zoom}
                timezone={timezone}
                timezoneOptions={getTimezoneReactSelectOptions()}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationCreateStep1Container);
