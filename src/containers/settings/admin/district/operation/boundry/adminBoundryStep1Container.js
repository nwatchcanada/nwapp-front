import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminBoundryStep1Component from "../../../../../../components/settings/admin/district/operation/boundry/adminBoundryStep1Component";
import { setFlashMessage } from "../../../../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../../helpers/localStorageUtility';


class AdminDistrictBoundryOperationStep1Container extends Component {
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
            isPolygonToolLocked: isEmpty(districtPolygon) === false,
        }
        this.onEditPath = this.onEditPath.bind(this);
        this.onCreatePath = this.onCreatePath.bind(this);
        this.onDeletePath = this.onDeletePath.bind(this);
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

    onEditPath(e) {
        console.log("onEditPath | e:", e);
        this.setState({
            isPolygonToolLocked: true,
        });
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
        this.setState({
            isPolygonToolLocked: false,
        });
    }

    onClick(e) {
        e.preventDefault();
        this.props.history.push("/admin/settings/district/operation/boundry-step-2/"+this.state.slug);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            districtPolygon,isLoading, slug, errors, isPolygonToolLocked
        } = this.state;

        const district = this.props.districtDetail
            ? this.props.districtDetail
            : {};

        const tenant = isEmpty(this.props.tenant)
            ? {latitude: 0, longitude: 0, zoom: 0,}
            : this.props.tenant;

        return (
            <AdminBoundryStep1Component
                districtPolygon={districtPolygon}
                tenant={tenant}
                slug={slug}
                district={district}
                isPolygonToolLocked={isPolygonToolLocked}
                isLoading={isLoading}
                errors={errors}
                onEditPath={this.onEditPath}
                onCreatePath={this.onCreatePath}
                onDeletePath={this.onDeletePath}
                onClick={this.onClick}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDistrictBoundryOperationStep1Container);
