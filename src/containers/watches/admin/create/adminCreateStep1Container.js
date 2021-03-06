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


class AdminWatchCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: false
        }

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

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Save to our browsers memory.
        localStorage.setItem('nwapp-watch-typeOf', typeOf);

        // Redirect to the next page.
        this.props.history.push("/admin/watches/step-2-create");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { errors } = this.state;
        return (
            <AdminWatchCreateStep1Component
                errors={errors}
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
