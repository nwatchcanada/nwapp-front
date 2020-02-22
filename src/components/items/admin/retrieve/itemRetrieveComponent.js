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
        const { itemData, onClick, onBack, onArchiveClick, flashMessage, slug } = this.props;

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

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Argyle
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map-pin"></i>&nbsp;Argyle</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/item/${slug}/comments`}>
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
                                <tr>
                                    <th scope="row" className="bg-light">Type</th>
                                    <td>
                                        <PrettyIcon typeOf={itemData.typeOf} />&nbsp;<PrettyTypeOf typeOf={itemData.typeOf} />
                                    </td>
                                </tr>
                                {itemData.name &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>{itemData.name}</td>
                                    </tr>
                                }
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Event Type</th>
                                        <td>{itemData.eventPrettyEventTypeOf}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{itemData.description}</td>
                                </tr>
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Date</th>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{itemData.date}</Moment>
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Logo Photo</th>
                                        <td>
                                            <div style={thumb}>
                                                <img
                                                    src={itemData.logoPhoto.preview}
                                                    style={img}
                                                    alt={itemData.logoPhoto.name}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Gallery Photos</th>
                                        <td>
                                            {itemData.galleryPhotos && itemData.galleryPhotos.map(
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
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">This event should be shown to whom?</th>
                                        <td>{itemData.shownToWhomLabel}</td>
                                    </tr>
                                }
                                {itemData.typeOf === EVENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">This event can be shared by others on social media?</th>
                                        <td>{itemData.canBePostedOnSocialMediaLabel}</td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Category</th>
                                        <td>
                                            {itemData.prettyIncidentTypeOf}
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Notified Authorities</th>
                                        <td>
                                            {itemData.notifiedAuthoritiesLabel}
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Accept Authority Cooperation</th>
                                        <td>
                                            {itemData.acceptAuthorityCooperationLabel}
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Date</th>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{itemData.date}</Moment>
                                        </td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Location</th>
                                        <td>{itemData.location}</td>
                                    </tr>
                                }
                                {itemData.typeOf === INCIDENT_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Photos</th>
                                        <td>
                                            {itemData.photos && itemData.photos.map(
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
                                {itemData.typeOf === CONCERN_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Location</th>
                                        <td>{itemData.location}</td>
                                    </tr>
                                }
                                {itemData.typeOf === CONCERN_ITEM_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Photos</th>
                                        <td>
                                            {itemData.photos && itemData.photos.map(
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
                            </tbody>
                        </table>


                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>
                            <button className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" onClick={onBack}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
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
