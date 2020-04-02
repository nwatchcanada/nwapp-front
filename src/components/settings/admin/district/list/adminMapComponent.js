import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../../flashMessageComponent";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    AREA_COORDINATOR_ROLE_ID,
    MEMBER_ROLE_ID
} from "../../../../../constants/api";
import { UserTypeOfIconHelper } from "../../../../../constants/helper";


class AdminDistrictMapComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,
            onZoomEnd, onMoveEnd, onPopupOpen, onPopupClose, onClick,

            // Data
            districtList,

            // Everything else...
            flashMessage, onTableChange, isLoading, tenant
        } = this.props;

        const districts = districtList.results ? districtList.results : [];

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
                           <Link to="/admin/districtes"><i className="fas fa-users"></i>&nbsp;Districtes</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Map
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/districtes`} role="button">
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

                                {districtList !== undefined && districtList != null &&
                                    <DistrictMarker
                                        districts={districtList.results}
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




function DistrictMarker({ districts, onPopupOpen, onPopupClose, onClick }) {
    let districtMarkers = [];
    for (let district of districts) {
        console.log(district); // For debugging purposes.
        if (district.boundryPosition !== undefined && district.boundryPosition !== null) {
            let districtMarker = (
                <Marker position={district.boundryPosition} key={district.slug}>
                    <Popup onOpen={ (slug)=> { onPopupOpen(district.slug) } } onClose={ (slug)=> { onPopupClose(district.slug) } }>
                        <DistrictMarkerContent
                            district={district}
                            onClick={onClick}
                        />
                    </Popup>
                </Marker>
            );
            districtMarkers.push(districtMarker);
            districtMarkers.push(
                <Polygon color="purple" positions={district.boundryPolygon} />
            );
        }
    }
    return districtMarkers;
}


function DistrictMarkerContent({ district, onClick }) {
    return (
        <div>
            <h3>{district.name}</h3>
            <p className="m-0"><strong>Tags:</strong></p>
            {district &&
                <p>
                    {district.tags && district.tags.map(
                        (tag) => <TagItem tag={tag} key={tag.id} />)
                    }
                </p>
            }
            <p>
            <button className="btn btn-success btn-lg" onClick={ (event,typeOfCode, slug)=>onClick(event, district.typeOfCode, district.slug) }>
                View&nbsp;<i className="fas fa-arrow-circle-right"></i>
            </button>
            </p>
        </div>
    );

    return (
        <div>

            {district && district.streetAddress &&
                <p className="text-muted">
                    <span>
                        <i className="fas fa-map-marker-alt"></i>&nbsp;{district && district.streetAddress}
                    </span>
                </p>
            }
            {district && district.email &&
                <p>
                    <strong>Email</strong>:&nbsp;
                    <a href={`mailto:${district.email}`}><i className="fas fa-envelope"></i>&nbsp;{district.email}</a>
                </p>
            }
            {district && district.primaryPhoneE164 &&
                <p>
                    <strong>Phone</strong>:&nbsp;
                    <a href={`tel:${district.primaryPhoneE164}`}>
                        <i className="fas fa-phone-square"></i>&nbsp;{district.primaryPhoneNational}
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

export default AdminDistrictMapComponent;
