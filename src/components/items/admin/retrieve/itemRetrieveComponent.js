import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";


export default class ItemRetrieveComponent extends Component {
    render() {
        const { item, onClick, onArchiveClick, flashMessage, slug } = this.props;

        // COPIED FROM: /components/boostrap/bootstrapMultipleImageUploadAndPreview.js
        const thumb = {
            display: 'inline-flex',
            // borderRadius: 2,
            // border: '1px solid #eaeaea',
            marginBottom: 8,
            marginRight: 8,
            width: 100,
            height: 100,
            padding: 4,
            boxSizing: 'border-box'
        };
        const img = {
            display: 'block',
            width: 'auto',
            height: '100%'
        };

        console.log(item);

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;{item && item.title}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map-pin"></i>&nbsp;{item && item.title}</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/item/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Item Details
                                        <button className="btn btn-warning btn-sm  float-right pl-4 pr-4" onClick={onArchiveClick}>
                                            <i className="fas fa-archive"></i>&nbsp;Archive
                                        </button>
                                    </th>
                                </tr>
{/*
                                <tr>
                                    <th scope="row" className="bg-light">Type</th>
                                    <td>
                                        <PrettyIcon typeOf={item.typeOf} />&nbsp;<PrettyTypeOf typeOf={item.typeOf} />
                                    </td>
                                </tr>
                                {item.name &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>{item.name}</td>
                                    </tr>
                                }
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Event Type</th>
                                        <td>{item.eventPrettyEventTypeOf}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{item.description}</td>
                                </tr>
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Date</th>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{item.date}</Moment>
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Logo Photo</th>
                                        <td>
                                            <div style={thumb}>
                                                <img
                                                    src={item.logoPhoto.preview}
                                                    style={img}
                                                    alt={item.logoPhoto.name}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Gallery Photos</th>
                                        <td>
                                            {item.galleryPhotos && item.galleryPhotos.map(
                                                (photoObj, i) => <div key={i}>
                                                    <div style={thumb}>
                                                        <img
                                                            src={photoObj.preview}
                                                            style={img}
                                                            alt={photoObj.name}
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">This event should be shown to whom?</th>
                                        <td>{item.shownToWhomLabel}</td>
                                    </tr>
                                }
                                {item.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">This event can be shared by others on social media?</th>
                                        <td>{item.canBePostedOnSocialMediaLabel}</td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Category</th>
                                        <td>
                                            {item.prettyIncidentTypeOf}
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Notified Authorities</th>
                                        <td>
                                            {item.notifiedAuthoritiesLabel}
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Accept Authority Cooperation</th>
                                        <td>
                                            {item.acceptAuthorityCooperationLabel}
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Date</th>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{item.date}</Moment>
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Location</th>
                                        <td>{item.location}</td>
                                    </tr>
                                }
                                {item.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Photos</th>
                                        <td>
                                            {item.photos && item.photos.map(
                                                (photoObj, i) => <div key={i}>
                                                    <div style={thumb}>
                                                        <img
                                                            src={photoObj.preview}
                                                            style={img}
                                                            alt={photoObj.name}
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                }
                                {item.typeOf === CONCERN_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Location</th>
                                        <td>{item.location}</td>
                                    </tr>
                                }
                                {item.typeOf === CONCERN_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Photos</th>
                                        <td>
                                            {item.photos && item.photos.map(
                                                (photoObj, i) => <div key={i}>
                                                    <div style={thumb}>
                                                        <img
                                                            src={photoObj.preview}
                                                            style={img}
                                                            alt={photoObj.name}
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                }
                                */}
                            </tbody>
                        </table>


                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>
                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to="/admin/items">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


export const PrettyTypeOf = ({ typeOf }) => {
    if (typeOf === INCIDENT_ITEM_TYPE_OF) {
        return "Incident";
    } else if (typeOf === EVENT_ITEM_TYPE_OF) {
        return "Event";
    } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
        return "Concern";
    } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
        return "Information";
    } else {
        return null;
    }
}




export const PrettyIcon = ({ typeOf }) => {
    if (typeOf === INCIDENT_ITEM_TYPE_OF) {
        return <i className="fas fa-fire"></i>;
    } else if (typeOf === EVENT_ITEM_TYPE_OF) {
        return <i className="fas fa-glass-cheers"></i>;
    } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
        return <i className="fas fa-exclamation-circle"></i>;
    } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
        return <i className="fas fa-info-circle"></i>;
    } else {
        return null;
    }
}
