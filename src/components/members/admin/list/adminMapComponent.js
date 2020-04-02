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


class AdminMemberMapComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,
            onZoomEnd, onMoveEnd, onPopupOpen, onPopupClose, onClick,

            // Data
            memberList,

            // Everything else...
            flashMessage, onTableChange, isLoading, tenant
        } = this.props;

        const members = memberList.results ? memberList.results : [];

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
                           <Link to="/admin/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Map
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/members`} role="button">
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
                                {memberList !== undefined && memberList != null &&
                                    <MemberMarker
                                        members={memberList.results}
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




function MemberMarker({ members, onPopupOpen, onPopupClose, onClick }) {
    let memberMarkers = [];
    for (let member of members) {
        console.log(member); // For debugging purposes.
        let memberMarker = (
            <Marker position={member.position} key={member.slug}>
                <Popup onOpen={ (slug)=> { onPopupOpen(member.slug) } } onClose={ (slug)=> { onPopupClose(member.slug) } }>
                    <MemberMarkerContent
                        member={member}
                        onClick={onClick}
                    />
                </Popup>
            </Marker>
        );
        memberMarkers.push(memberMarker);
    }
    return memberMarkers;
}


function MemberMarkerContent({ member, onClick }) {
    return (
        <div>
            {member && member.organizationName && member.roleId === BUSINESS_TYPE_OF &&
                <h1>{member.organizationName}</h1>
            }
            <h3>
                {member.firstName}&nbsp;{member.lastName}
            </h3>
            {member && member.streetAddress &&
                <p className="text-muted">
                    <span>
                        <i className="fas fa-map-marker-alt"></i>&nbsp;{member && member.streetAddress}
                    </span>
                </p>
            }
            {member && member.email &&
                <p>
                    <strong>Email</strong>:&nbsp;
                    <a href={`mailto:${member.email}`}><i className="fas fa-envelope"></i>&nbsp;{member.email}</a>
                </p>
            }
            {member && member.primaryPhoneE164 &&
                <p>
                    <strong>Phone</strong>:&nbsp;
                    <a href={`tel:${member.primaryPhoneE164}`}>
                        <i className="fas fa-phone-square"></i>&nbsp;{member.primaryPhoneNational}
                    </a>
                </p>
            }
            <p className="m-0"><strong>Tags:</strong></p>
            {member &&
                <p>
                    {member.tags && member.tags.map(
                        (tag) => <TagItem tag={tag} key={tag.id} />)
                    }
                </p>
            }
            <p>
            <button className="btn btn-success btn-lg" onClick={ (event,slug)=>onClick(event, member.slug) }>
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

export default AdminMemberMapComponent;
