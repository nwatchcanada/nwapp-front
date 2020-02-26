import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep4ConcernComponent from "../../../../../components/items/admin/create/concern/itemCreateStep4ConcernComponent";
import {
    localStorageSetObjectOrArrayItem, localStorageGetArrayItem, localStorageGetIntegerItem
} from '../../../../../helpers/localStorageUtility';
import { validateConcernStep4Input } from "../../../../../validators/itemValidator";


class ItemCreateStep4ConcernContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            title: localStorage.getItem("nwapp-item-create-concern-title"),
            description: localStorage.getItem("nwapp-item-create-concern-description"),
            location: localStorage.getItem("nwapp-item-create-concern-location"),
            errors: {},
            isLoading: false
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
        const key = "nwapp-item-create-concern-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-item-create-concern-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-item-create-concern-'+optionKey, option);
        console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateConcernStep4Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/admin/item/add/step-5-concern");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors
            })

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
        const { title, description, location, errors } = this.state;
        return (
            <ItemCreateStep4ConcernComponent
                title={title}
                description={description}
                location={location}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                onSelectChange={this.onSelectChange}
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
)(ItemCreateStep4ConcernContainer);
