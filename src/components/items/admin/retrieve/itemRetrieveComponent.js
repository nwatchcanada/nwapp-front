import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
   INCIDENT_ITEM_TYPE_OF, EVENT_ITEM_TYPE_OF, CONCERN_ITEM_TYPE_OF, INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";
import ItemIncidentRetrieveComponent from "./itemIncidentRetrieveComponent";
import ItemEventRetrieveComponent from "./itemEventRetrieveComponent";
import ItemConcernRetrieveComponent from "./itemConcernRetrieveComponent";


export default class ItemRetrieveComponent extends Component {
    render() {
        const { item, onClick, onArchiveClick, flashMessage, slug } = this.props;
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
                            {item && item.typeOfCategory === INCIDENT_ITEM_TYPE_OF &&
                                <ItemIncidentRetrieveComponent item={item} />
                            }
                            {item && item.typeOfCategory === EVENT_ITEM_TYPE_OF &&
                                <ItemEventRetrieveComponent item={item} />
                            }
                            {item && item.typeOfCategory === CONCERN_ITEM_TYPE_OF &&
                                <ItemConcernRetrieveComponent item={item} />
                            }
                        </table>
                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            {/* <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </button> */}
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
