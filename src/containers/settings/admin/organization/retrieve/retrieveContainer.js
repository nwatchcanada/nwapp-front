import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminOrganizationSettingRetrieveComponent from "../../../../../components/settings/admin/organization/retrieve/adminRetrieveComponent";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";

import validateInput from '../../../../../validators/organizationValidator';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../../../helpers/timezoneUtlity";
import { pullTenantDetail, putTenantDetail } from "../../../../../actions/tenantActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../../constants/api";
import { getSubdomain } from "../../../../../helpers/urlUtility";


class AdminOrganizationSettingRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const schemaName = getSubdomain();

        this.state = {
            schema: schemaName,
            schemaName: schemaName,
            name: "-",
            alternateName: "-",
            description: "-",
            country: "-",
            province: "-",
            city: "-",
            streetNumber: "-",
            streetName: "-",
            streetType: "-",
            streetTypeLabel: "-",
            apartmentUnit: "-",
            streetTypeOption: "-",
            streetTypeOther: "-",
            streetDirection: "-",
            streetDirectionOption: "-",
            streetDirectionLabel: "-",
            postalCode: "-",
            timezone: "-",
            policeReportUrl: "-",
            errors: {},
            isLoading: true, // Reason for `true` is because we need to fetch the data first.
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTenantDetail(
            this.state.schemaName,
            this.onSuccessCallback,
            this.onFailureCallback
        );
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(tenantDetail) {
        console.log(tenantDetail);
        this.setState({
            name: tenantDetail.name,
            alternateName: tenantDetail.alternateName,
            description: tenantDetail.description,
            country: tenantDetail.country,
            province: tenantDetail.province,
            city: tenantDetail.city,
            streetNumber: tenantDetail.streetNumber,
            streetName: tenantDetail.streetName,
            streetType: tenantDetail.streetType,
            streetTypeLabel: tenantDetail.streetTypeLabel,
            apartmentUnit: tenantDetail.apartmentUnit,
            // streetTypeOption: tenantDetail.streetTypeOption,
            streetTypeOther: tenantDetail.streetTypeOther,
            streetDirection: tenantDetail.streetDirection,
            streetDirectionLabel: tenantDetail.streetDirectionLabel,
            // streetDirectionOption: tenantDetail.streetDirectionOption,
            postalCode: tenantDetail.postalCode,
            timezone: tenantDetail.timezoneName,
            policeReportUrl: tenantDetail.policeReportUrl,
            isLoading: false, // Turn off because we have finished.
        });
    }

    onFailureCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/settings");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/settings/organiztion/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            schema, name, alternateName, description, country, province, city,
            streetNumber, streetName, streetType, apartmentUnit,
            streetTypeOther, streetTypeLabel, streetDirection,
            streetDirectionLabel, postalCode, timezone, policeReportUrl,
            errors, isLoading
        } = this.state;

        return (
            <AdminOrganizationSettingRetrieveComponent
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
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                streetDirectionLabel={streetDirectionLabel}
                postalCode={postalCode}
                timezone={timezone}
                timezoneOptions={getTimezoneReactSelectOptions()}
                policeReportUrl={policeReportUrl}
                errors={errors}
                isLoading={isLoading}

                onBack={this.onBack}
                onClick={this.onClick}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullTenantDetail: (schemaName, successCallback, errorCallback) => {
            dispatch(
                pullTenantDetail(schemaName, successCallback, errorCallback)
            )
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOrganizationSettingRetrieveContainer);
