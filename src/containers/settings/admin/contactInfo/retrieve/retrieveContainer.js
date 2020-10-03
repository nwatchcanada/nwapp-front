import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminContactInfoSettingRetrieveComponent from "../../../../../components/settings/admin/contactInfo/retrieve/adminRetrieveComponent";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";

import validateInput from '../../../../../validators/organizationValidator';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../../../helpers/timezoneUtlity";
import { pullTenantDetail, putTenantDetail } from "../../../../../actions/tenantActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../../constants/api";
import { getSubdomain } from "../../../../../helpers/urlUtility";


class AdminContactInfoSettingRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            email: "-",
            phone: "-",
            websiteUrl: "-",
            facebookUrl: "-",
            twitterUrl: "-",
            instagramUrl: "-",
            youtubeUrl: "-",
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
            email: tenantDetail.email,
            phone: tenantDetail.phone,
            websiteUrl: tenantDetail.websiteUrl,
            facebookUrl: tenantDetail.facebookUrl,
            twitterUrl: tenantDetail.twitterUrl,
            instagramUrl: tenantDetail.instagramUrl,
            youtubeUrl: tenantDetail.youtubeUrl,
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
        this.props.history.push("/admin/settings/contact-info/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            email, phone, websiteUrl, facebookUrl, twitterUrl, instagramUrl, youtubeUrl, errors, isLoading
        } = this.state;

        return (
            <AdminContactInfoSettingRetrieveComponent
                email={email}
                phone={phone}
                websiteUrl={websiteUrl}
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                instagramUrl={instagramUrl}
                youtubeUrl={youtubeUrl}
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
)(AdminContactInfoSettingRetrieveContainer);
