import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminBoundryComponent from "../../../../../components/settings/admin/district/operation/adminBoundryComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { deleteDistrict } from "../../../../../actions/districtActions";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';


class AdminDistrictBoundryOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;

        const districtPolygon = localStorageGetObjectItem("nwapp-district-new-boundry-polygon");
        console.log("constructor | districtPolygon", districtPolygon);

        this.state = {
            isLoading: false,
            district: slug,
            slug: slug,
            errors: {},
            districtPolygon: districtPolygon,
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
        console.log("onEditPath | e:", e);
    }

    onCreatePath(e) {
        console.log("onCreatePath | e:", e);
        let layer = e.layer;
        let feature = layer.toGeoJSON();
        console.log("onCreatePath | feature:", feature);
        let geometry = feature.geometry;
        let polygon = geometry.coordinates[0];

        let transformedPolygon = [];
        for (let i=0; i < polygon.length; i++) {
            let coord = polygon[i];
            let transformedCoord = [coord[1], coord[0]];
            console.log(coord, "->", transformedCoord);
            transformedPolygon.push(transformedCoord);
        }
        console.log(transformedPolygon);
        localStorageSetObjectOrArrayItem('nwapp-district-new-boundry-polygon', transformedPolygon);
    }

    onDeletePath(e) {
        console.log("onDeletePath", e);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            districtPolygon,isLoading, slug, errors, showModal
        } = this.state;

        const district = this.props.districtDetail
            ? this.props.districtDetail
            : {};

        const tenant = isEmpty(this.props.tenant)
            ? {latitude: 0, longitude: 0, zoom: 0,}
            : this.props.tenant;

        return (
            <AdminBoundryComponent
                districtPolygon={districtPolygon}
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
)(AdminDistrictBoundryOperationContainer);
