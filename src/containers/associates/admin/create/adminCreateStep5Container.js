import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateCreateStep5Component from "../../../../components/associates/admin/create/adminCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../../validators/associateValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";



class AdminAssociateCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-associate-typeOf"),
            apartmentUnit: localStorage.getItem("nwapp-create-associate-apartmentUnit"),
            streetNumber: localStorage.getItem("nwapp-create-associate-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-associate-streetName"),
            streetType: localStorageGetIntegerItem("nwapp-create-associate-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-associate-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-associate-streetTypeOther"),
            streetDirection: localStorageGetIntegerItem("nwapp-create-associate-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-associate-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-associate-postalCode"),
            country: localStorage.getItem("nwapp-create-associate-country"),
            region: localStorage.getItem("nwapp-create-associate-region"),
            locality: localStorage.getItem("nwapp-create-associate-locality"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
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

    onSuccessfulSubmissionCallback(associate) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/admin/associates/add/step-6");
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
        localStorage.setItem('nwapp-create-associate-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-associate-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-associate-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-associate-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }
        localStorage.setItem('nwapp-create-associate-country', value);
    }

    onRegionChange(value) {
        this.setState({ region: value });
        localStorage.setItem('nwapp-create-associate-region', value);
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
            streetNumber, streetName, streetType, apartmentUnit, streetTypeOther, streetDirection, postalCode,  country, region, locality, errors
        } = this.state;
        return (
            <AdminAssociateCreateStep5Component
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
                region={region}
                locality={locality}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRegionChange={this.onRegionChange}
                onCountryChange={this.onCountryChange}
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
)(AdminAssociateCreateStep5Container);
