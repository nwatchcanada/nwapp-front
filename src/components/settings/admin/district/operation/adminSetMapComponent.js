import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
// import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminSetMapComponent extends Component {
    render() {
        const {
            isLoading, slug, district, errors, onClick, tenant,
            onEditPath, onCreatePath, onDeletePath
        } = this.props;

        // Extract the default map zooming details.
        const { defaultPosition, defaultZoom } = tenant;
        const { latitude, longitude } = defaultPosition;
        const coords = [longitude, latitude];
        const zoom = defaultZoom;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings">
                                <i className="fas fa-cogs"></i>&nbsp;Settings
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/districts">
                                <i className="fas fa-map"></i>&nbsp;Districts
                            </Link>
                        </li>

                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/settings/district/${district && district.typeOfCode}/${district && district.slug}/operations`}>
                                <i className="fas fa-building"></i>&nbsp;{district && district.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Set Boundary
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/settings/district/${district && district.typeOfCode}/${district && district.slug}/operations`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to Operations
                        </Link>
                    </div>
                </div>

                <h1><i className="fas fa-map"></i>&nbsp;Set Boundry</h1>

                {district.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This district is archived and is read-only.
                    </div>
                }

                <div className="row ">
                    <div className="col-md-10 mx-auto p-2">
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
                                easeLinearity={0.35}>

                                <TileLayer
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />

                                <FeatureGroup>
                                    <EditControl
                                        position='topright'
                                        onEdited={onEditPath}
                                        onCreated={onCreatePath}
                                        onDeleted={onDeletePath}
                                        draw={{
                                            polyline: false,
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
