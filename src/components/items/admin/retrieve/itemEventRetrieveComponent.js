import React from "react";
import Moment from 'react-moment';
// import 'moment-timezone';
import { Link } from "react-router-dom";

import {
    ItemIconHelper, ItemTypeOfLabelHelper, ItemShownToWhomLabelHelper
} from "../../../../constants/helper";


export default function ItemEventRetrieveComponent({ item }) {

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
        <tbody key="Incident-Table-Body">

            {/* CATEGORY */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-sign"></i>&nbsp;Category
                    <Link className="btn btn-success btn-sm  float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-category`}>
                        <i className="fas fa-edit"></i>
                    </Link>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Type</th>
                <td>
                    <ItemIconHelper typeOf={item && item.typeOfCategory} />&nbsp;<ItemTypeOfLabelHelper typeOf={item && item.typeOfCategory} />
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Category</th>
                <td>
                    {item && item.typeOfText}
                </td>
            </tr>

            {/* AUTHORITIES FORM */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-calendar"></i>&nbsp;Date/Start
                    <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-date-start`}>
                        <i className="fas fa-edit"></i>
                    </Link>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">When will the event happen?</th>
                <td>
                    <Moment format="YYYY/MM/DD">{item.startAt}</Moment>
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">When will the event finish?</th>
                <td>
                    <Moment format="YYYY/MM/DD">{item.finishAt}</Moment>
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Is all day event?</th>
                <td>
                    {item && item.isAllDayEvent
                        ? "Yes"
                        : "No"
                    }
                </td>
            </tr>

            {/* DETAILS */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-table"></i>&nbsp;Details
                    <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-details`}>
                        <i className="fas fa-edit"></i>
                    </Link>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Title</th>
                <td>
                    {item && item.title}
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Description</th>
                <td>{item && item.description}</td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">External Web Address</th>
                <td>{item && item.externalUrl}</td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Logo</th>
                <td>
                    <img src={item && item.eventLogoImage && item.eventLogoImage.fileUrl} alt="Logo Image" />
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">This event should be shown to whom?</th>
                <td><ItemShownToWhomLabelHelper shownToWhomId={item && item.shownToWhom} /></td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">This event can be shared by others on social media?</th>
                <td>
                    {item && item.canBePostedOnSocialMedia
                        ? "Yes"
                        : "No"
                    }
                </td>
            </tr>

            {/* PHOTOS */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-images"></i>&nbsp;Photo(s)
                    <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-photos`}>
                        <i className="fas fa-edit"></i>
                    </Link>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Uploaded file(s):</th>
                <td>
                    {item.photos && item.photos.map(
                        (photoObj, i) => <div key={i}>
                            <div style={thumb}>
                                <img
                                    src={photoObj.fileUrl}
                                    style={img}
                                    alt={photoObj.title}
                                />
                            </div>
                            <br />
                        </div>
                    )}
                </td>
            </tr>
        </tbody>
    );
}
