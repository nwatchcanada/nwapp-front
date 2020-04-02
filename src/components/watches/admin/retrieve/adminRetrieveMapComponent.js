import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, FeatureGroup, Marker, Popup, Polygon } from 'react-leaflet';
// import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
// import { EditControl } from "react-leaflet-draw"

import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { UserTypeOfIconHelper } from "../../../../constants/helper";


export default class AdminWatchMapBoundryComponent extends Component {
    render() {
        const {
            slug, watch, onClick, onBack, flashMessage, isLoading
        } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <UserTypeOfIconHelper typeOfId={watch && watch.typeOf} />&nbsp;{watch && watch.name}{watch && watch.isVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><UserTypeOfIconHelper typeOfId={watch && watch.typeOf} />&nbsp;{watch && watch.name}{watch && watch.isVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}</h1>

                {watch && watch.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This watch data is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/watch/${slug}`}>
                                <span className="num"><i className="fas fa-table"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-map"></i>&nbsp;</span><span className="">Map</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/watch/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/watch/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud-download-alt"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-4" className="st-grey">
                            <Link to={`/admin/watch/${slug}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-md-10 mx-auto p-2">

                        <h2><i className="fas fa-map"></i>&nbsp;Boundry Map</h2>
                        {watch.boundryPolygon
                            ? <div>
                                {isLoading===false &&
                                    <LeafletMap
                                        center={watch.boundryPosition}
                                        zoom={watch.boundryZoom}
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

                                        <Polygon color="purple" positions={watch.boundryPolygon} />

                                    </LeafletMap>
                                }
                            </div>
                            : <div>
                                <div className="jumbotron">
                                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;No Boundary</h1>
                                    <p className="lead">There is no boundry set for this watch.</p>

                                    <p className="lead">
                                        <Link className="btn btn-success btn-lg" to={`/admin/watch/${slug}/operation/boundry`}>
                                            <i className="fas fa-edit"></i>&nbsp;Set
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>


            </div>
        );
    }
}
