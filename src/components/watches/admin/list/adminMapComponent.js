import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    AREA_COORDINATOR_ROLE_ID,
    MEMBER_ROLE_ID
} from "../../../../constants/api";
import { UserTypeOfIconHelper } from "../../../../constants/helper";


class AdminWatchMapComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,
            onZoomEnd, onMoveEnd, onPopupOpen, onPopupClose, onClick,

            // Data
            watchList,

            // Everything else...
            flashMessage, onTableChange, isLoading, tenant
        } = this.props;

        const watchs = watchList.results ? watchList.results : [];

        // Extract the default map zooming details.
        const { defaultPosition, defaultZoom } = tenant;

        // Finally render our page.
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/watches"><i className="fas fa-users"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Map
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/watches`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to List
                        </Link>
                    </div>
                </div>

                <h1><i className="fas fa-map"></i>&nbsp;Map</h1>
                <div className="row">
                    <div className="col-md-12">
                        {isLoading===false &&
                            <LeafletMap
                                center={defaultPosition}
                                zoom={defaultZoom}
                                maxZoom={19}
                                attributionControl={ isLoading === false}
                                zoomControl={ isLoading === false }
                                doubleClickZoom={ isLoading === false }
                                scrollWheelZoom={ isLoading === false }
                                dragging={ isLoading === false }
                                animate={ isLoading === false }
                                easeLinearity={0.35}
                                onMoveEnd={onMoveEnd}
                                onZoomEnd={onZoomEnd}
                            >
                                <TileLayer
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />

                                {watchList !== undefined && watchList != null &&
                                    <WatchMarker
                                        watchs={watchList.results}
                                        onPopupOpen={onPopupOpen}
                                        onPopupClose={onPopupClose}
                                        onClick={onClick}
                                    />
                                }

                            </LeafletMap>
                        }
                    </div>
                </div>
            </div>
        );
    }
}




function WatchMarker({ watchs, onPopupOpen, onPopupClose, onClick }) {
    let watchMarkers = [];
    for (let watch of watchs) {
        console.log(watch); // For debugging purposes.
        if (watch.boundryPosition !== undefined && watch.boundryPosition !== null) {
            let watchMarker = (
                <Marker position={watch.boundryPosition} key={watch.slug}>
                    <Popup onOpen={ (slug)=> { onPopupOpen(watch.slug) } } onClose={ (slug)=> { onPopupClose(watch.slug) } }>
                        <WatchMarkerContent
                            watch={watch}
                            onClick={onClick}
                        />
                    </Popup>
                </Marker>
            );
            watchMarkers.push(watchMarker);
            watchMarkers.push(
                <Polygon color="purple" positions={watch.boundryPolygon} />
            );
        }
    }
    return watchMarkers;
}


function WatchMarkerContent({ watch, onClick }) {
    return (
        <div>
            <h3>{watch.name}</h3>
            <p className="m-0"><strong>Tags:</strong></p>
            {watch &&
                <p>
                    {watch.tags && watch.tags.map(
                        (tag) => <TagItem tag={tag} key={tag.id} />)
                    }
                </p>
            }
            <p>
            <button className="btn btn-success btn-lg" onClick={ (event,slug)=>onClick(event, watch.slug) }>
                View&nbsp;<i className="fas fa-arrow-circle-right"></i>
            </button>
            </p>
        </div>
    );

    return (
        <div>

            {watch && watch.streetAddress &&
                <p className="text-muted">
                    <span>
                        <i className="fas fa-map-marker-alt"></i>&nbsp;{watch && watch.streetAddress}
                    </span>
                </p>
            }
            {watch && watch.email &&
                <p>
                    <strong>Email</strong>:&nbsp;
                    <a href={`mailto:${watch.email}`}><i className="fas fa-envelope"></i>&nbsp;{watch.email}</a>
                </p>
            }
            {watch && watch.primaryPhoneE164 &&
                <p>
                    <strong>Phone</strong>:&nbsp;
                    <a href={`tel:${watch.primaryPhoneE164}`}>
                        <i className="fas fa-phone-square"></i>&nbsp;{watch.primaryPhoneNational}
                    </a>
                </p>
            }

        </div>
    );
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}

export default AdminWatchMapComponent;
