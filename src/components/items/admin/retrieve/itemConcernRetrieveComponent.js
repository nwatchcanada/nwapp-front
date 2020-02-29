import React from "react";
// import Moment from 'react-moment';
// import 'moment-timezone';

import { ItemIconHelper, ItemTypeOfLabelHelper } from "../../../../constants/helper";


export default function ItemConcernRetrieveComponent({ item }) {

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
        <tbody key="Concern-Table-Body">

            {/* CATEGORY */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-sign"></i>&nbsp;Category
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Type</th>
                <td>
                    <ItemIconHelper typeOf={item && item.typeOfCategory} />&nbsp;<ItemTypeOfLabelHelper typeOf={item && item.typeOfCategory} />
                </td>
            </tr>

            {/* AUTHORITIES FORM */}
{/*
            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-user-secret"></i>&nbsp;Authorities Form
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Have you notified the authorities of this Concern? </th>
                <td>
                    {item && item.hasNotifiedAuthorities}
                </td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Please note that Neighbourhood Watch London cooperates with local authorities, and if requested by the police or a court order, a copy of this report will be made available to them. Do you wish to proceed?</th>
                <td>
                    {item && item.hasAcceptAuthorityCooperation}
                </td>
            </tr>
*/}
            {/* DETAILS */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-table"></i>&nbsp;Details
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Title</th>
                <td>
                    {item && item.title}
                </td>
            </tr>
            {/*<tr>
                <th scope="row" className="bg-light">Date</th>
                <td>
                    <Moment format="YYYY/MM/DD">{item.date}</Moment>
                </td>
            </tr>*/}
            <tr>
                <th scope="row" className="bg-light">Description</th>
                <td>{item.description}</td>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Location</th>
                <td>{item.location}</td>
            </tr>

            {/* PHOTOS */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-images"></i>&nbsp;Photo(s)
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
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
