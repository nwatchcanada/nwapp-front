import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
// import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
// import { EditControl } from "react-leaflet-draw"

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminDistrictRetrieveMapComponent extends Component {
    render() {
        const { districtData, onClick, onBack, flashMessage, isLoading } = this.props;
        const coords = [42.983611, -81.249722];
        const zoom = 13;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/districts"><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-building"></i>&nbsp;{districtData && districtData.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-building"></i>&nbsp;{districtData && districtData.name}</h1>

                {districtData && districtData.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This district data is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/settings/district/${districtData && districtData.typeOfCode}/${districtData && districtData.slug}`}>
                                <span className="num">
                                    <i className="fas fa-table"></i>&nbsp;</span><span className="">Details
                                </span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">
                                    <i className="fas fa-map"></i>&nbsp;</span><span className="">Map
                                </span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/settings/district/${districtData && districtData.typeOfCode}/${districtData && districtData.slug}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-md-10 mx-auto p-2">

                        <h2><i className="fas fa-map"></i>&nbsp;Boundry Map</h2>

                        {isLoading===false &&
                            <LeafletMap
                                center={coords}
                                zoom={zoom}
                                maxZoom={zoom}
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
                            </LeafletMap>
                        }
                    </div>
                </div>


            </div>
        );
    }
}
