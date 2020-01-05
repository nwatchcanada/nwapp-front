import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminAssociateCreateStep3Component from "../../../../components/associates/admin/create/adminCreateStep3Component";
import { BUSINESS_TYPE_OF, RESIDENCE_TYPE_OF } from '../../../../constants/api';


class AdminAssociateCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.onRezOrComClick = this.onRezOrComClick.bind(this);
        this.onBizClick = this.onBizClick.bind(this);
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

    onRezOrComClick() {
        localStorage.setItem("nwapp-create-associate-typeOf", RESIDENCE_TYPE_OF);
        this.props.history.push("/admin/associates/add/step-4");
    }

    onBizClick() {
        localStorage.setItem("nwapp-create-associate-typeOf", BUSINESS_TYPE_OF);
        this.props.history.push("/admin/associates/add/step-4");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAssociateCreateStep3Component
                onBizClick={this.onBizClick}
                onRezOrComClick={this.onRezOrComClick}
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
)(AdminAssociateCreateStep3Container);
