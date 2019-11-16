import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationUpdateComponent from "../../../../components/organizations/shared/update/sharedOrganizationUpdateComponent";
import validateInput from '../../../../validators/organizationValidator';
import { getTimezoneReactSelectOptions } from "../../../../helpers/timezoneUtlity";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullTenantDetail, putTenantDetail } from "../../../../actions/tenantActions";


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
            schemaName: schemaName,
            name: '',
            alternateName: '',
            description: '',
            country: '',
            region: '',
            locality: '',
            streetAddress: '',
            postalCode: '',
            timezone: '',
            errors: {},
            isLoading: true,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onOrgDetailFetchCallback = this.onOrgDetailFetchCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTenantDetail(this.state.schemaName, this.onOrgDetailFetchCallback);
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{ return; };
    }

    /**
     *  Utility function used to update the `postData` we will be submitting to
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

    onOrgDetailFetchCallback(orgDetail) {
        console.log(orgDetail); // For debugging purpose only.

        this.setState({
            schema: orgDetail.schemaName,
            name: orgDetail.name,
            alternateName: orgDetail.alternateName,
            description: orgDetail.description,
            country: orgDetail.addressCountry,
            region: orgDetail.addressRegion,
            locality: orgDetail.addressLocality,
            streetAddress: orgDetail.streetAddress,
            postalCode: orgDetail.postalCode,
            timezone: orgDetail.timezoneName,
            errors: {},
            isLoading: false,
        });
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

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
    }

    onCancelClick() {
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
        this.setState({ region: value })
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
            schemaName, name, alternateName, description, country, region, locality, streetAddress, postalCode, timezone, errors, isLoading
        } = this.state;
        return (
            <SharedOrganizationUpdateComponent
                schemaName={schemaName}
                name={name}
                alternateName={alternateName}
                description={description}
                country={country}
                region={region}
                locality={locality}
                streetAddress={streetAddress}
                timezone={timezone}
                timezoneOptions={getTimezoneReactSelectOptions()}
                postalCode={postalCode}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onCancelClick={this.onCancelClick}
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
        pullTenantDetail: (schemaName, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTenantDetail(schemaName, onSuccessCallback, onFailureCallback)
            )
        },
        putTenantDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putTenantDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationUpdateContainer);
