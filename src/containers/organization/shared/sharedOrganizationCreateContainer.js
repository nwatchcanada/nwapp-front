import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SharedOrganizationCreateComponent from "../../../components/organizations/shared/sharedOrganizationCreateComponent";
import validateInput from '../../../validators/organizationValidator';
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { getTimezoneReactSelectOptions } from "../../../helpers/timezoneUtlity";

class SharedOrganizationCreateContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            schema: '',
            name: '',
            description: '',
            country: '',
            region: '',
            locality: '',
            timezone: '',
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
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
        this.setState = (state,callback)=>{ return; };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "Organization has been successfully created.");
        this.props.history.push("/organizations");
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
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }

        // validateInput
        // this.props.postRegister(
        //     this.state,
        //     (data) => {
        //         console.log(data); // Do nothing.
        //     },
        //     (data) => {
        //         console.log(data);
        //
        //         // The following code will cause the screen to scroll to the top of
        //         // the page. Please see ``react-scroll`` for more information:
        //         // https://github.com/fisshy/react-scroll
        //         var scroll = Scroll.animateScroll;
        //         scroll.scrollToTop();
        //     }
        // );
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { schema, name, description, country, region, locality, timezone, errors, isLoading } = this.state;
        const timezoneOptions = getTimezoneReactSelectOptions();
        return (
            <SharedOrganizationCreateComponent
                schema={schema}
                name={name}
                description={description}
                country={country}
                region={region}
                locality={locality}
                timezone={timezone}
                timezoneOptions={timezoneOptions}
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
        // putDevice: (user, deviceSlug, data, successCallback, errorCallback) => {
        //     dispatch(
        //         putDevice(user, deviceSlug, data, successCallback, errorCallback)
        //     )
        // },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationCreateContainer);
