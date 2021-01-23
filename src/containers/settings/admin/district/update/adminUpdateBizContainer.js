import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminDistrictUpdateBizComponent from "../../../../../components/settings/admin/district/update/adminUpdateBizComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullDistrictDetail, putDistrict } from '../../../../../actions/districtActions';
import { validateBusinessInput } from "../../../../../validators/districtValidator";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';
import { BUSINESS_TYPE_OF } from '../../../../../constants/api';


class AdminDistrictUpdateBizContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const district = localStorageGetObjectItem("nwapp-admin-retrieve-district-"+slug.toString() );
        const isLoading = isEmpty(district);

        this.state = {
            typeOf: BUSINESS_TYPE_OF,
            slug: slug,
            name: district.name,
            description: district.description,
            websiteUrl: district.websiteUrl,
            logo: district.logoImage,
            errors: {},
            district: district,
            isLoading: isLoading,
            facebookUrl: "",
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.websiteUrl = this.state.websiteUrl;

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
        this.props.pullDistrictDetail(
            this.state.slug,
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "District has been successfully updated.");
        this.props.history.push("/admin/settings/district/biz/"+this.state.slug);
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ isLoading: false, district: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-district-"+this.state.slug.toString(), response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
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

        // Perform client-side validation.
        const { errors, isValid } = validateBusinessInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                isLoading: true,
                error: {},
            },()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.putDistrict(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onDrop(acceptedFiles) {
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onDrop | file", file);

        const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        // For debugging purposes.
        console.log("DEBUG | onDrop | fileWithPreview", fileWithPreview);

        // Update our local state to update the GUI.
        this.setState({
            logo: fileWithPreview
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, icon, number, name, description, websiteUrl, isLoading, logo, errors } = this.state;
        return (
            <AdminDistrictUpdateBizComponent
                slug={slug}
                icon={icon}
                number={number}
                name={name}
                description={description}
                websiteUrl={websiteUrl}
                logo={logo}
                isLoading={isLoading}
                errors={errors}
                onTextChange={this.onTextChange}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullDistrictDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullDistrictDetail(slug, successCallback, failedCallback))
        },
        putDistrict: (data, successCallback, failedCallback) => {
            dispatch(putDistrict(data, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDistrictUpdateBizContainer);
