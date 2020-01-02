import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationUpdateComponent from "../../../../components/organizations/shared/update/sharedOrganizationUpdateComponent";
import validateInput from '../../../../validators/organizationValidator';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../../helpers/timezoneUtlity";
import { pullTenantDetail, putTenantDetail } from "../../../../actions/tenantActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


class SharedOrganizationUpdateContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { schemaName } = this.props.match.params;

        this.state = {
            schema: schemaName,
            schemaName: schemaName,
            name: "-",
            alternateName: "-",
            description: "-",
            country: "-",
            region: "-",
            locality: "-",
            streetNumber: "-",
            streetName: "-",
            streetType: "-",
            apartmentUnit: "-",
            streetTypeOption: "-",
            streetTypeOther: "-",
            streetDirection: "-",
            streetDirectionOption: "-",
            postalCode: "-",
            timezone: "-",
            errors: {},
            isLoading: true, // Reason for `true` is because we need to fetch the data first.
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onSuccessfulPullCallback = this.onSuccessfulPullCallback.bind(this);
        this.onFailedPullCallback = this.onFailedPullCallback.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTenantDetail(
            this.state.schemaName,
            this.onSuccessfulPullCallback,
            this.onFailedPullCallback
        );
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

        // Address Region: This field is required.
        postData.addressRegion = this.state.region

        // Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

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

    onSuccessfulPullCallback(tenantDetail) {
        console.log(tenantDetail);
        this.setState({
            name: tenantDetail.name,
            alternateName: tenantDetail.alternateName,
            description: tenantDetail.description,
            country: tenantDetail.country,
            region: tenantDetail.region,
            locality: tenantDetail.locality,
            streetNumber: tenantDetail.streetNumber,
            streetName: tenantDetail.streetName,
            streetType: tenantDetail.streetType,
            apartmentUnit: tenantDetail.apartmentUnit,
            // streetTypeOption: tenantDetail.streetTypeOption,
            streetTypeOther: tenantDetail.streetTypeOther,
            streetDirection: tenantDetail.streetDirection,
            // streetDirectionOption: tenantDetail.streetDirectionOption,
            postalCode: tenantDetail.postalCode,
            timezone: tenantDetail.timezoneName,
            isLoading: false, // Turn off because we have finished.
        });
    }

    onFailedPullCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });
    }

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "Organization has been successfully updated.");
        this.props.history.push("/organizations");
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
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
    }

    onBackClick() {
        this.props.history.push("/organizations");
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }
    }

    onRegionChange(value) {
        this.setState({ region: value });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=> {
                this.props.putTenantDetail(
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
            schema, name, alternateName, description, country, region, locality,
            streetNumber, streetName, streetType, apartmentUnit, streetTypeOther, streetDirection, postalCode,
            timezone, errors, isLoading
        } = this.state;
        return (
            <SharedOrganizationUpdateComponent
                schema={schema}
                name={name}
                alternateName={alternateName}
                description={description}
                country={country}
                region={region}
                locality={locality}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                apartmentUnit={apartmentUnit}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                postalCode={postalCode}
                timezone={timezone}
                timezoneOptions={getTimezoneReactSelectOptions()}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onBackClick={this.onBackClick}
                onCountryChange={this.onCountryChange}
                onRegionChange={this.onRegionChange}
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
        putTenantDetail: (postData, successCallback, errorCallback) => {
            dispatch(
                putTenantDetail(postData, successCallback, errorCallback)
            )
        },
        pullTenantDetail: (schemaName, successCallback, errorCallback) => {
            dispatch(
                pullTenantDetail(schemaName, successCallback, errorCallback)
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
)(SharedOrganizationUpdateContainer);
