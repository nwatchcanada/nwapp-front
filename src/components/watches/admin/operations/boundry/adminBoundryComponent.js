import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, FeatureGroup, Marker, Popup, Polygon } from 'react-leaflet';
// import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import ReactModal from 'react-modal';
import "./gui.css"

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { UserTypeOfIconHelper } from "../../../../../constants/helper";


export default class AdminBoundryComponent extends Component {
    render() {
        const {
            watchPolygon, isLoading, slug, watch, errors, onClick, tenant,
            onEditPath, onCreatePath, onDeletePath, onZoomEnd, onMoveEnd,
        } = this.props;

        // Extract the default map zooming details.
        const { defaultPosition, defaultZoom } = tenant;
        const coords = [defaultPosition[0], defaultPosition[1]];
        const zoom = defaultZoom;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : '25%',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        // For debugging purposes only.
        // console.log("coords:", coords);
        // console.log("polygon:", watchPolygon);

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watches`}><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watch/${slug}/operations`}><UserTypeOfIconHelper typeOfId={watch && watch.typeOf} />&nbsp;{watch && watch.name}{watch && watch.isVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Set Boundry
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/watch/${slug}/operations`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to Operations
                        </Link>
                    </div>
                </div>

                <h1><i className="fas fa-map"></i>&nbsp;Set Boundry</h1>

                {watch.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This watch is archived and is read-only.
                    </div>
                }

                <div className="row ">
                    <div className="col-md-10 mx-auto p-2">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                        {isLoading===false &&
                            <LeafletMap
                                center={coords}
                                zoom={zoom}
                                maxZoom={19}
                                attributionControl={ isLoading === false}
                                zoomControl={ isLoading === false }
                                doubleClickZoom={ isLoading === false }
                                scrollWheelZoom={ isLoading === false }
                                dragging={ isLoading === false }
                                animate={ isLoading === false }
                                easeLinearity={0.35}
                                onMoveEnd={onMoveEnd}
                                onZoomEnd={onZoomEnd}>

                                <TileLayer
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />

                                <Polygon color="purple" positions={watchPolygon} />

                                <FeatureGroup>
                                    <EditControl
                                        position='topright'
                                        onEdited={onEditPath}
                                        onCreated={onCreatePath}
                                        onDeleted={onDeletePath}
                                        draw={{
                                            polyline: false,
                                            polygon: true,
                                            rectangle: false,
                                            circle: false,
                                            marker: false,
                                            circlemarker: false,
                                        }}
                                    />
                                </FeatureGroup>

                            </LeafletMap>
                        }
                    </div>
                </div>

            </div>
        );
    }
}
