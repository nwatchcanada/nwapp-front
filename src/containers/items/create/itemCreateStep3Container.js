import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep3Component from "../../../components/items/create/itemCreateStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import validateInput from "../../../validators/itemValidator";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract the type of container.
        const typeOf = parseInt(localStorage.getItem("temp-item-create-typeOf"));
        let returnURL;
        if (typeOf === INCIDENT_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-incident";
        } else if (typeOf === EVENT_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-event";
        } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-concern";
        } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-information";
        }

        // Set the state.
        this.state = {
            typeOf: typeOf,
            returnURL: returnURL,
            name: localStorage.getItem("temp-item-create-name"),
            errors: {},
            isLoading: false
        }

        // Set the functions.
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
        this.props.setFlashMessage("success", "Item has been successfully created.");
        this.props.history.push("/items");
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
        const { errors, isValid } = validateInput(this.state);

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
        const { returnURL, name, errors } = this.state;
        return (
            <ItemCreateStep3Component
                returnURL={returnURL}
                name={name}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep3Container);