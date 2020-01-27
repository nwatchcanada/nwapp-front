import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchCreateStep1Component from "../../../../components/watches/admin/create/adminCreateStep1Component";
import { validateStep1CreateInput } from "../../../../validators/watchValidator";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class AdminWatchCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
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
        const key = "nwapp-create-watch-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Save to our browsers memory.
        localStorage.setItem('nwapp-watch-add-typeOf', typeOf);

        // Redirect to the next page.
        if (typeOf === RESIDENCE_TYPE_OF) {
            this.props.history.push("/admin/watches/step-2-create");
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            this.props.history.push("/admin/watches/add/step-2-create");
        }
        else if (typeOf === COMMUNITY_CARES_TYPE_OF) {
            this.props.history.push("/admin/watches/add/step-2-create");
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { name, errors } = this.state;
        return (
            <AdminWatchCreateStep1Component
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep1Container);
