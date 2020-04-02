import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminBoundryComponent from "../../../../../components/watches/admin/operations/boundry/adminBoundryComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { putWatchBoundryOperation } from "../../../../../actions/watchActions";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';


class AdminWatchBoundryOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;

        const watch = this.props.watchDetail
            ? this.props.watchDetail
            : {};

        console.log("constructor | watch:", watch);

        // const watchPolygon = localStorageGetObjectItem("nwapp-watch-new-boundry-polygon");
        // console.log("constructor | watchPolygon", watchPolygon);

        const { defaultPosition, defaultZoom, watchPolygon } = this.props.tenant;

        this.state = {
            // GUI
            isLoading: false,
            slug: slug,
            errors: {},
            watch: watch,
            watchPosition: defaultPosition,
            watchZoom: defaultZoom,
            watchPolygon: watchPolygon,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onEditPath = this.onEditPath.bind(this);
        this.onCreatePath = this.onCreatePath.bind(this);
        this.onDeletePath = this.onDeletePath.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
        this.onZoomEnd = this.onZoomEnd.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        delete postData.watch;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
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
                this.props.setFlashMessage("success", "Watch boundary has been successfully uodated.");
                this.props.history.push("/admin/watch/" + this.state.slug + "/operations");
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

        this.setState({
            errors: {},
            isLoading: true,
        }, ()=>{
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putWatchBoundryOperation(
                this.getPostData(),
                this.onSuccessCallback,
                this.onFailureCallback
            );
        });
    }

    onCreatePath(e) {
        // Special thanks:
        // - https://gis.stackexchange.com/a/266103
        // - https://github.com/alex3165/react-leaflet-draw
        // - http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html

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

        this.setState({
            watchPolygon: transformedPolygon,
        }, ()=>{
            localStorageSetObjectOrArrayItem('nwapp-watch-new-boundry-polygon', transformedPolygon);
        });
    }

    onDeletePath(e) {
        console.log("onDeletePath", e);
        this.setState({
            watchPolygon: null,
        });
    }

    /**
     *  Event handler function gets fired by `Leaflet` every time the user
     *  moves the map and or zooms in or out.
     *
     *  Note: https://leafletjs.com/reference-1.6.0.html#map-moveend
     */
    onMoveEnd(e) {
        // Defensive Code: Prevent function operation if still processing API call.
        if (this.state.isLoading) {
            return;
        }

        // Note: https://leafletjs.com/reference-1.6.0.html#map-getcenter
        const centrePosition = e.target.getCenter();
        console.log("onMoveEnd | centrePosition:", centrePosition);

        const coords = [centrePosition.lat, centrePosition.lng];
        console.log("onMoveEnd | coords:", coords);

        this.setState({
            watchPosition: coords,
        },()=>{
            console.log("onMoveEnd | updated state | watchPosition:", this.state.watchPosition);
        });
    }

    onZoomEnd(e) {
        // Defensive Code: Prevent function operation if still processing API call.
        if (this.state.isLoading) {
            return;
        }

        // Note: https://leafletjs.com/reference-1.6.0.html#map-getzoom
        const zoom = e.target.getZoom();

        this.setState({
            zoom: zoom,
        },()=>{
            console.log("onZoomEnd | zoom:", zoom);
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            watchPolygon,isLoading, slug, errors, showModal
        } = this.state;

        const watch = this.props.watchDetail
            ? this.props.watchDetail
            : {};

        const tenant = isEmpty(this.props.tenant)
            ? {latitude: 0, longitude: 0, zoom: 0,}
            : this.props.tenant;

        return (
            <AdminBoundryComponent
                watchPolygon={isEmpty(watchPolygon) ? [] : watchPolygon}
                tenant={tenant}
                slug={slug}
                watch={watch}
                isLoading={isLoading}
                errors={errors}
                onEditPath={this.onEditPath}
                onCreatePath={this.onCreatePath}
                onDeletePath={this.onDeletePath}
                onMoveEnd={this.onMoveEnd}
                onZoomEnd={this.onZoomEnd}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        watchDetail: store.watchDetailState,
        tenant: store.tenantDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putWatchBoundryOperation: (putData, onSuccessCallback, onFailureCallback) => {
            dispatch(putWatchBoundryOperation(putData, onSuccessCallback, onFailureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchBoundryOperationContainer);
