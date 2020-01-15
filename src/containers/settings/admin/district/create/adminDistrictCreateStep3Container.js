import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminDistrictCreateStep3Component from "../../../../../components/settings/admin/district/create/adminDistrictCreateStep3Component";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageGetIntegerItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';


class AdminDistrictCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const typeOf = localStorageGetIntegerItem('nwapp-district-add-typeOf');
        let step2URL = "";
        if (typeOf === RESIDENCE_TYPE_OF) {
            step2URL = "/admin/settings/district/add/step-2-rez";
        } else if (typeOf === BUSINESS_TYPE_OF) {
            step2URL = "/admin/settings/district/add/step-2-biz";
        } else {
            step2URL = "/admin/settings/district/add/step-2-cc";
        }
        console.log("TypeOf", typeOf); // For debugging purposes only.
        console.log("URL", step2URL); // For debugging purposes only.

        this.state = {
            name: localStorage.getItem('nwapp-district-add-name'),
            description: localStorage.getItem('nwapp-district-add-description'),
            websiteURL: localStorage.getItem('nwapp-district-add-websiteURL'),
            logo: JSON.parse(localStorage.getItem('nwapp-district-add-logo')),
            counselorName: localStorage.getItem('nwapp-district-add-counselorName'),
            counselorEmail: localStorage.getItem('nwapp-district-add-counselorEmail'),
            counselorPhone: localStorage.getItem('nwapp-district-add-counselorPhone'),
            image: localStorage.getItem('nwapp-district-add-image'),
            typeOf: typeOf,
            step2URL: step2URL,
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "District has been successfully created.");
        // localStorageRemoveItemsContaining("nwapp-district-add-");
        this.props.history.push("/admin/settings/districts");
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.onSuccessfulSubmissionCallback();
        // this.onFailedSubmissionCallback(errors);
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            name, description, websiteURL, logo, errors, isLoading, step2URL
        } = this.state;
        return (
            <AdminDistrictCreateStep3Component
                name={name}
                description={description}
                websiteURL={websiteURL}
                logo={logo}
                errors={errors}
                onClick={this.onClick}
                onDrop={this.onDrop}
                isLoading={isLoading}
                step2URL={step2URL}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDistrictCreateStep3Container);
