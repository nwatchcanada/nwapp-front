import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminContactInfoSettingUpdateComponent from "../../../../../components/settings/admin/contactInfo/update/updateComponent";
import validateInput from '../../../../../validators/organizationContactInfoValidator';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../../../helpers/timezoneUtlity";
import { pullTenantDetail, putTenantDetail } from "../../../../../actions/tenantActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../../constants/api";
import { getSubdomain } from "../../../../../helpers/urlUtility";


class AdminContactInfoSettingUpdateContainer extends Component {

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
            name: props.tenantDetail.name,
            alternateName: props.tenantDetail.alternateName,
            description: props.tenantDetail.description,
            country: props.tenantDetail.country,
            province: props.tenantDetail.province,
            city: props.tenantDetail.city,
            streetNumber: props.tenantDetail.streetNumber,
            streetName: props.tenantDetail.streetName,
            streetType: props.tenantDetail.streetType,
            streetTypeLabel: props.tenantDetail.streetTypeLabel,
            apartmentUnit: props.tenantDetail.apartmentUnit,
            // streetTypeOption: tenantDetail.streetTypeOption,
            streetTypeOther: props.tenantDetail.streetTypeOther,
            streetDirection: props.tenantDetail.streetDirection,
            streetDirectionLabel: props.tenantDetail.streetDirectionLabel,
            // streetDirectionOption: tenantDetail.streetDirectionOption,
            postalCode: props.tenantDetail.postalCode,
            timezoneName: props.tenantDetail.timezoneName,
            policeReportUrl: props.tenantDetail.policeReportUrl,
            districtPosition: props.tenantDetail.districtPosition,
            districtZoom: props.tenantDetail.districtZoom,
            districtPolygon: props.tenantDetail.districtPolygon,

            email: props.tenantDetail.email,
            phone: props.tenantDetail.phone,
            websiteUrl: props.tenantDetail.websiteUrl,
            facebookUrl: props.tenantDetail.facebookUrl,
            twitterUrl: props.tenantDetail.twitterUrl,
            instagramUrl: props.tenantDetail.instagramUrl,
            youtubeUrl: props.tenantDetail.youtubeUrl,
            errors: {},

            isLoading: true, // Reason for `true` is because we need to fetch the data first.
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onProvinceChange = this.onProvinceChange.bind(this);
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

    onFailedPullCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });
    }

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "Contact information has been successfully updated.");
        this.props.history.push("/admin/settings/contact-info");
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
        this.props.history.push("/admin/settings/contact-info");
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, province: null })
        } else {
            this.setState({ country: value, province: null })
        }
    }

    onProvinceChange(value) {
        this.setState({ province: value });
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
            email, phone, websiteUrl, facebookUrl, twitterUrl, instagramUrl, youtubeUrl, errors, isLoading
        } = this.state;
        return (
            <AdminContactInfoSettingUpdateComponent
                email={email}
                phone={phone}
                websiteUrl={websiteUrl}
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                instagramUrl={instagramUrl}
                youtubeUrl={youtubeUrl}
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
        tenantDetail: store.tenantDetailState,
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
)(AdminContactInfoSettingUpdateContainer);
