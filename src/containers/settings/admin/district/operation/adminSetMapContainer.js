import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminSetMapComponent from "../../../../../components/settings/admin/district/operation/adminSetMapComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { deleteDistrict } from "../../../../../actions/districtActions";


class AdminSetMapOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;

        this.state = {
            isLoading: false,
            district: slug,
            slug: slug,
            errors: {},

        }
        this.onEditPath = this.onEditPath.bind(this);
        this.onCreatePath = this.onCreatePath.bind(this);
        this.onDeletePath = this.onDeletePath.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "District have been successfully archived.");
                this.props.history.push("/admin/settings/districts");
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
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

    onEditPath(e) {
        console.log("onEditPath", e);
        alert("TODO");
    }

    onCreatePath(e) {
        console.log("onCreatePath", e);
        let layer = e.layer;
        let feature = layer.toGeoJSON();
        console.log(feature);
    }

    onDeletePath(e) {
        console.log("onDeletePath", e);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, slug, errors } = this.state;

        const district = this.props.districtDetail ? this.props.districtDetail : {};
        const tenant = isEmpty(this.props.tenant)
            ? {latitude: 0, longitude: 0, zoom: 0,}
            : this.props.tenant;

        return (
            <AdminSetMapComponent
                tenant={tenant}
                slug={slug}
                district={district}
                isLoading={isLoading}
                errors={errors}
                onEditPath={this.onEditPath}
                onCreatePath={this.onCreatePath}
                onDeletePath={this.onDeletePath}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        districtDetail: store.districtDetailState,
        tenant: store.tenantDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        deleteDistrict: (slug, onSuccessCallback, onFailureCallback) => {
            dispatch(deleteDistrict(slug, onSuccessCallback, onFailureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSetMapOperationContainer);
