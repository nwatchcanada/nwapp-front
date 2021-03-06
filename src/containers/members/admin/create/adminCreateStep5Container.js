import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminMemberCreateStep5Component from "../../../../components/members/admin/create/adminCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../../validators/memberValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";



class AdminMemberCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Pre-assign the country, province and city fields based on the
        // tenant details from the user profile.
        let country = localStorage.getItem("nwapp-create-member-country");
        if (country === undefined || country === null || country === "") {
            country = this.props.user.tenantCountry;
            localStorage.setItem("nwapp-create-member-country", country);
        }
        let province = localStorage.getItem("nwapp-create-member-province");
        if (province === undefined || province === null || province === "") {
            province = this.props.user.tenantProvince;
            localStorage.setItem("nwapp-create-member-province", province);
        }
        let city = localStorage.getItem("nwapp-create-member-city");
        if (city === undefined || city === null || city === "") {
            city = this.props.user.tenantCity;
            localStorage.setItem("nwapp-create-member-city", city);
        }

        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-member-typeOf"),
            apartmentUnit: localStorage.getItem("nwapp-create-member-apartmentUnit"),
            streetNumber: localStorage.getItem("nwapp-create-member-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-member-streetName"),
            streetType: localStorageGetIntegerItem("nwapp-create-member-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-member-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-member-streetTypeOther"),
            streetDirection: localStorageGetIntegerItem("nwapp-create-member-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-member-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-member-postalCode"),
            country: country,
            province: province,
            city: city,
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        this.props.history.push("/admin/members/add/step-6");
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
        });
        localStorage.setItem('nwapp-create-member-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-member-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-member-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-member-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, province: null })
        } else {
            this.setState({ country: value, province: null })
        }
        localStorage.setItem('nwapp-create-member-country', value);
    }

    onProvinceChange(value) {
        this.setState({ province: value });
        localStorage.setItem('nwapp-create-member-province', value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

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
        const {
            streetNumber, streetName, streetType, apartmentUnit, streetTypeOther, streetDirection, postalCode,  country, province, city, errors
        } = this.state;
        return (
            <AdminMemberCreateStep5Component
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                apartmentUnit={apartmentUnit}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                postalCode={postalCode}
                country={country}
                province={province}
                city={city}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onProvinceChange={this.onProvinceChange}
                onCountryChange={this.onCountryChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tenantDetail: store.tenantDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep5Container);
