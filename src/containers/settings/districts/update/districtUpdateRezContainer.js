import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DistrictUpdateRezComponent from "../../../../components/settings/districts/update/districtUpdateRezComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateResidentialInput } from "../../../../validators/districtValidator";


class DistrictUpdateRezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        this.state = {
            slug: slug,
            icon: null,
            number: 0,
            name: null,
            description: null,
            counselorName: null,
            counselorEmail: null,
            counselorPhone: null,
            cityRoleNumber: null,
            legalDescription: null,
            linkToCityWebsite: null,
            errors: {},
        }

        this.onTextChange = this.onTextChange.bind(this);
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

        // THIS IS WHERE YOUR API SAVES THE DATA.
        this.setState({
            slug: 'argyle-rez',
            icon: 'home',
            number: 1,
            name: 'Argyle (Rez)',
            description: 'This is a residential district.',
            counselorName: 'Bart Mika',
            counselorEmail: 'bart@mikasoftware.com',
            counselorPhone: '(111) 222-3333',
            cityRoleNumber: '123456',
            legalDescription: 'Argyle',
            linkToCityWebsite: 'http://google.com',
            errors: {},
        });
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
        this.props.history.push("/settings/district-rez/"+this.state.slug);
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
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialInput(this.state);

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
        const { slug, name, description, counselorName, counselorEmail, counselorPhone, cityRoleNumber, legalDescription, linkToCityWebsite, errors, isLoading } = this.state;
        return (
            <DistrictUpdateRezComponent
                slug={slug}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistrictUpdateRezContainer);
