import React from "react";
// import Moment from 'react-moment';
// import 'moment-timezone';

import { ItemIconHelper, ItemTypeOfLabelHelper } from "../../../../constants/helper";


export default function ItemCommunityNewsRetrieveComponent({ item }) {

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
        <tbody key="CommunityNews-Table-Body">

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
            <tr>
                <th scope="row" className="bg-light">Category</th>
                <td>
                    {item && item.typeOfText}
                </td>
            </tr>

            {/* REACH */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-bullhorn"></i>&nbsp;Reach
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Choice</th>
                <td>
                    {item && item.whoNewsForLabel}
                </td>
            </tr>

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
                <th scope="row" className="bg-light">Description</th>
                <td>{item && item.description}</td>
            </tr>

            {/* LINK */}

            <tr className="bg-dark">
                <th scope="row" colSpan="2" className="text-light">
                    <i className="fas fa-external-link-alt"></i>&nbsp;Link
                    <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                        <i className="fas fa-edit"></i>
                    </button>
                </th>
            </tr>
            <tr>
                <th scope="row" className="bg-light">Choice</th>
                <td>{item && item.externalUrl}</td>
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
