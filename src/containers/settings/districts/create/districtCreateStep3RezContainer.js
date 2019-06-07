import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DistrictCreateStep3RezComponent from "../../../../components/settings/districts/create/districtCreateStep3RezComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";


class DistrictCreateStep3ResidentialContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('temp-district-rez-name'),
            description: localStorage.getItem('temp-district-rez-description'),
            counselorName: localStorage.getItem('temp-district-rez-counselorName'),
            counselorEmail: localStorage.getItem('temp-district-rez-counselorEmail'),
            counselorPhone: localStorage.getItem('temp-district-rez-counselorPhone'),
            cityRoleNumber: localStorage.getItem('temp-district-rez-cityRoleNumber'),
            legalDescription: localStorage.getItem('temp-district-rez-legalDescription'),
            linkToCityWebsite: localStorage.getItem('temp-district-rez-linkToCityWebsite'),
            image: localStorage.getItem('temp-district-rez-image'),
            program: localStorage.getItem('temp-district-program'),
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

    onSuccessfulSubmissionCallback() {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "District has been successfully created.");
        this.props.history.push("/settings/districts");
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

        // Perform client-side validation.
        this.onSuccessfulSubmissionCallback();
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { name, description, counselorName, counselorEmail, counselorPhone, cityRoleNumber, legalDescription, linkToCityWebsite, errors, isLoading } = this.state;
        return (
            <DistrictCreateStep3RezComponent
                name={name}
                description={description}
                counselorName={counselorName}
                counselorEmail={counselorEmail}
                counselorPhone={counselorPhone}
                cityRoleNumber={cityRoleNumber}
                legalDescription={legalDescription}
                linkToCityWebsite={linkToCityWebsite}
                errors={errors}
                isLoading={isLoading}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistrictCreateStep3ResidentialContainer);
