import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

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


class AdminAreaCoordinatorMapComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,
            onZoomEnd, onMoveEnd, onPopupOpen, onPopupClose, onClick,

            // Data
            areaCoordinatorList,

            // Everything else...
            flashMessage, onTableChange, isLoading, tenant
        } = this.props;

        const areaCoordinators = areaCoordinatorList.results ? areaCoordinatorList.results : [];

        // Extract the default map zooming details.
        const { defaultPosition, defaultZoom } = tenant;
        const { latitude, longitude } = defaultPosition;
        const coords = [longitude, latitude];
        const zoom = defaultZoom;

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
                           <Link to="/admin/area-coordinators"><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Map
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/area-coordinators`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to List
                        </Link>
                    </div>
                </div>

                <h1><i className="fas fa-map"></i>&nbsp;Map</h1>

                <div className="row">
                    <div className="col-md-12">
                        {isLoading === false &&
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
                                onZoomEnd={onZoomEnd}
                            >
                                <TileLayer
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />
                                {areaCoordinatorList !== undefined && areaCoordinatorList != null &&
                                    <AreaCoordinatorMarker
                                        areaCoordinators={areaCoordinatorList.results}
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




function AreaCoordinatorMarker({ areaCoordinators, onPopupOpen, onPopupClose, onClick }) {
    let areaCoordinatorMarkers = [];
    for (let areaCoordinator of areaCoordinators) {
        console.log(areaCoordinator); // For debugging purposes.
        let areaCoordinatorMarker = (
            <Marker position={areaCoordinator.position} key={areaCoordinator.slug}>
                <Popup onOpen={ (slug)=> { onPopupOpen(areaCoordinator.slug) } } onClose={ (slug)=> { onPopupClose(areaCoordinator.slug) } }>
                    <AreaCoordinatorMarkerContent
                        areaCoordinator={areaCoordinator}
                        onClick={onClick}
                    />
                </Popup>
            </Marker>
        );
        areaCoordinatorMarkers.push(areaCoordinatorMarker);
    }
    return areaCoordinatorMarkers;
}


function AreaCoordinatorMarkerContent({ areaCoordinator, onClick }) {
    return (
        <div>
            {areaCoordinator && areaCoordinator.organizationName && areaCoordinator.roleId === BUSINESS_TYPE_OF &&
                <h1>{areaCoordinator.organizationName}</h1>
            }
            <h3>
                {areaCoordinator.firstName}&nbsp;{areaCoordinator.lastName}
            </h3>
            {areaCoordinator && areaCoordinator.streetAddress &&
                <p className="text-muted">
                    <span>
                        <i className="fas fa-map-marker-alt"></i>&nbsp;{areaCoordinator && areaCoordinator.streetAddress}
                    </span>
                </p>
            }
            {areaCoordinator && areaCoordinator.email &&
                <p>
                    <strong>Email</strong>:&nbsp;
                    <a href={`mailto:${areaCoordinator.email}`}><i className="fas fa-envelope"></i>&nbsp;{areaCoordinator.email}</a>
                </p>
            }
            {areaCoordinator && areaCoordinator.primaryPhoneE164 &&
                <p>
                    <strong>Phone</strong>:&nbsp;
                    <a href={`tel:${areaCoordinator.primaryPhoneE164}`}>
                        <i className="fas fa-phone-square"></i>&nbsp;{areaCoordinator.primaryPhoneNational}
                    </a>
                </p>
            }
            <p className="m-0"><strong>Tags:</strong></p>
            {areaCoordinator &&
                <p>
                    {areaCoordinator.tags && areaCoordinator.tags.map(
                        (tag) => <TagItem tag={tag} key={tag.id} />)
                    }
                </p>
            }
            <p>
            <button className="btn btn-success btn-lg" onClick={ (event,slug)=>onClick(event, areaCoordinator.slug) }>
                View&nbsp;<i className="fas fa-arrow-circle-right"></i>
            </button>
            </p>
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

export default AdminAreaCoordinatorMapComponent;
