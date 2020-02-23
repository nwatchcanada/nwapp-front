import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep3IncidentComponent from "../../../../../components/items/admin/create/incident/itemCreateStep3IncidentComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';
import { validateIncidentStep3Input } from "../../../../../validators/itemValidator";
import { OTHER_INCIDENT_TYPE_OF, INCIDENT_TYPE_CHOICES } from "../../../../../constants/api";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";


class ItemCreateStep3IncidentContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            errors: {},
            isLoading: false,
            notifiedAuthorities: localStorageGetIntegerItem("nwapp-item-create-incident-notifiedAuthorities"),
            acceptAuthorityCooperation: localStorageGetIntegerItem("nwapp-item-create-incident-acceptAuthorityCooperation"),
        }

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onAgreeModalClick = this.onAgreeModalClick.bind(this);
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

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/admin/item/add/step-4-incident");
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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-item-create-incident-"+[e.target.name];
        const storageLabelKey =  "nwapp-item-create-incident-"+[e.target.name].toString()+"-label";
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
        // Princident the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIncidentStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // CASE A OF B:
            if (this.state.acceptAuthorityCooperation === 1) {
                this.onSuccessfulSubmissionCallback();

            // CASE B OF B:
            } else {
                this.setState({
                    showModal: true
                })
            }

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    onAgreeModalClick(e) {
        e.preventDefault();
        this.props.setFlashMessage("danger", "Incident item has been aborted.");
        this.props.history.push("/admin/items");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { notifiedAuthorities, acceptAuthorityCooperation, showModal, errors } = this.state;
        return (
            <ItemCreateStep3IncidentComponent
                notifiedAuthorities={notifiedAuthorities}
                acceptAuthorityCooperation={acceptAuthorityCooperation}
                onRadioChange={this.onRadioChange}
                errors={errors}
                onClick={this.onClick}
                onCloseModalClick={this.onCloseModalClick}
                showModal={showModal}
                onAgreeModalClick={this.onAgreeModalClick}
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
)(ItemCreateStep3IncidentContainer);
