import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminItemTypeCreateStep1Component from "../../../../../components/settings/admin/itemType/create/adminCreateStep1Component";
import { validateInput } from "../../../../../validators/itemTypeValidator";
import {
    localStorageSetObjectOrArrayItem,
    localStorageGetIntegerItem
} from '../../../../../helpers/localStorageUtility';
import { ITEM_TYPE_CATEGORY_CHOICES } from "../../../../../constants/api";


class AdminItemTypeCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            // Variable used to lock buttons when makig submissions.
            isLoading: false,

            // ALL OUR GENERAL INFORMATION IS STORED HERE.
            category: localStorageGetIntegerItem('nwapp-itemType-add-category'),
            text: localStorage.getItem('nwapp-itemType-add-text'),
            description: localStorage.getItem('nwapp-itemType-add-description'),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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

    onSuccessfulSubmissionCallback(itemType) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/admin/settings/item-type/add/step-2");
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
        });
        localStorage.setItem('nwapp-itemType-add-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-itemType-add-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-itemType-add-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-itemType-add-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
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
        const { category, categoryOptions, text, description, errors } = this.state;
        return (
            <AdminItemTypeCreateStep1Component
                category={category}
                categoryOptions={ITEM_TYPE_CATEGORY_CHOICES}
                text={text}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
)(AdminItemTypeCreateStep1Container);
