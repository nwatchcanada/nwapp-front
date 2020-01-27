import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchCreateStep4Component from "../../../../components/watches/admin/create/adminCreateStep4Component";
import { validateStep4CreateInput } from "../../../../validators/watchValidator";
import {
    localStorageGetIntegerItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminWatchCreateStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-watch-typeOf"),
            organizationName: localStorage.getItem("nwapp-create-watch-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("nwapp-create-watch-organizationTypeOf"),
            firstName: localStorage.getItem("nwapp-create-watch-firstName"),
            lastName: localStorage.getItem("nwapp-create-watch-lastName"),
            primaryPhone: localStorage.getItem("nwapp-create-watch-primaryPhone"),
            // primaryPhoneTypeOf: localStorageGetIntegerItem("nwapp-create-client-primaryPhoneTypeOf"),
            secondaryPhone: localStorage.getItem("nwapp-create-watch-secondaryPhone"),
            // secondaryPhoneTypeOf: localStorageGetIntegerItem("nwapp-create-client-secondaryPhoneTypeOf"),
            email: localStorage.getItem("nwapp-create-watch-email"),
            isOkToEmail: localStorageGetIntegerItem("nwapp-create-watch-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("nwapp-create-watch-isOkToText"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
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

    onSuccessfulSubmissionCallback(watch) {
        this.props.history.push("/admin/watchs/add/step-5");
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
        const key = "nwapp-create-watch-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-watch-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-watch-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-watch-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-watch-"+[e.target.name];
        const storageLabelKey =  "nwapp-create-watch-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep4CreateInput(this.state);

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
        const {
            typeOf, organizationName, organizationTypeOf, firstName, lastName, primaryPhone, secondaryPhone, email, isOkToEmail, isOkToText, errors
        } = this.state;
        return (
            <AdminWatchCreateStep4Component
                typeOf={typeOf}
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep4Container);
