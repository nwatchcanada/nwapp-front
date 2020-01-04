import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminAreaCoordinatorCreateStep3Component from "../../../../components/areaCoordinators/admin/create/adminCreateStep3Component";
import { BUSINESS_TYPE_OF, RESIDENCE_TYPE_OF } from '../../../../constants/api';


class AdminAreaCoordinatorCreateStep3Container extends Component {
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
        localStorage.setItem("nwapp-create-areaCoordinator-typeOf", RESIDENCE_TYPE_OF);
        this.props.history.push("/admin/areaCoordinators/add/step-4");
    }

    onBizClick() {
        localStorage.setItem("nwapp-create-areaCoordinator-typeOf", BUSINESS_TYPE_OF);
        this.props.history.push("/admin/areaCoordinators/add/step-4");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAreaCoordinatorCreateStep3Component
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
)(AdminAreaCoordinatorCreateStep3Container);
