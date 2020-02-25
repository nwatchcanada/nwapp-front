import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep4ResourceLinkComponent from "../../../../../components/items/admin/create/resource/itemCreateStep4ResourceLinkComponent";
import { validateResourceStep4LinkInput } from "../../../../../validators/itemValidator";
import {
    RESOURCE_CATEGORY_CHOICES,
    RESOURCE_TYPE_OF_CHOICES,
    LINK_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageSetObjectOrArrayItem,
    localStorageGetObjectItem
} from '../../../../../helpers/localStorageUtility';


class ItemCreateStep4ResourceLinkContainer extends Component {
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
            typeOf: LINK_RESOURCE_TYPE_OF,
            name: localStorage.getItem('nwapp-item-create-resource-name'),
            externalUrl: localStorage.getItem('nwapp-item-create-resource-externalUrl'),
            description: localStorage.getItem('nwapp-item-create-resource-description'),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        localStorage.setItem('nwapp-item-create-resource-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log("optionKey", optionKey);
        localStorage.setItem('nwapp-item-create-resource-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-item-create-resource-'+optionKey, option);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResourceStep4LinkInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            localStorage.setItem("nwapp-item-create-resource-returnURL", "/admin/item/add/step-4-resource-link");
            this.props.history.push("/admin/item/add/step-5-resource");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors, isLoading: false, });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { typeOf, name, externalUrl, description, errors } = this.state;
        return (
            <ItemCreateStep4ResourceLinkComponent
                typeOf={typeOf}
                name={name}
                externalUrl={externalUrl}
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
)(ItemCreateStep4ResourceLinkContainer);
