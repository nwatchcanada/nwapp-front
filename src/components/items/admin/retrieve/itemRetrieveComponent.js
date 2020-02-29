import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
   INCIDENT_ITEM_TYPE_OF, EVENT_ITEM_TYPE_OF, CONCERN_ITEM_TYPE_OF, INFORMATION_ITEM_TYPE_OF,
   COMMUNITY_NEWS_ITEM_TYPE_OF, VOLUNTEER_ITEM_TYPE_OF, RESOURCE_ITEM_TYPE_OF
} from "../../../../constants/api";
import ItemIncidentRetrieveComponent from "./itemIncidentRetrieveComponent";
import ItemEventRetrieveComponent from "./itemEventRetrieveComponent";
import ItemConcernRetrieveComponent from "./itemConcernRetrieveComponent";
import ItemInformationRetrieveComponent from "./itemInformationRetrieveComponent";
import ItemCommunityNewsRetrieveComponent from "./itemCommunityNewsRetrieveComponent";
import ItemVolunteerRetrieveComponent from "./itemVolunteerRetrieveComponent";
import ItemResourceRetrieveComponent from "./itemResourceRetrieveComponent";


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
                            <i className="fas fa-map-pin"></i>&nbsp;Details</li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map-pin"></i>&nbsp;Details</h1>

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
                            {item && item.typeOfCategory === INFORMATION_ITEM_TYPE_OF &&
                                <ItemInformationRetrieveComponent item={item} />
                            }
                            {item && item.typeOfCategory === COMMUNITY_NEWS_ITEM_TYPE_OF &&
                                <ItemCommunityNewsRetrieveComponent item={item} />
                            }
                            {item && item.typeOfCategory === VOLUNTEER_ITEM_TYPE_OF &&
                                <ItemVolunteerRetrieveComponent item={item} />
                            }
                            {item && item.typeOfCategory === RESOURCE_ITEM_TYPE_OF &&
                                <ItemResourceRetrieveComponent item={item} />
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
