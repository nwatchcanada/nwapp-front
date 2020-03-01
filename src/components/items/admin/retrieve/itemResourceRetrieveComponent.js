import React from "react";
// import Moment from 'react-moment';
// import 'moment-timezone';
import DOMPurify from "dompurify";

import { ItemIconHelper, ItemTypeOfLabelHelper } from "../../../../constants/helper";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../constants/api";


export default function ItemResourceRetrieveComponent({ item }) {

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
        <tbody key="Resource-Table-Body">

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

            {/* DETAILS */}

            {item && item.formatType === LINK_RESOURCE_TYPE_OF &&
                <LinkItemComponent item={item} />
            }
            {item && item.formatType === YOUTUBE_VIDEO_RESOURCE_TYPE_OF &&
                <YouTubeItemComponent item={item} />
            }
        </tbody>
    );
}


export function LinkItemComponent({ item }) {
    const elements = [];
    elements.push(
        <tr className="bg-dark">
            <th scope="row" colSpan="2" className="text-light">
                <i className="fas fa-table"></i>&nbsp;Details
                <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                    <i className="fas fa-edit"></i>
                </button>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Description</th>
            <td>{item.description}</td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">External Web Address</th>
            <td>
                <a href={item && item.externalUrl} target="_blank">View&nbsp;<i className="fas fa-external-link-alt"></i></a>
            </td>
        </tr>
    );
    return elements;
}



export function YouTubeItemComponent({ item }) {
    const elements = [];
    elements.push(
        <tr className="bg-dark">
            <th scope="row" colSpan="2" className="text-light">
                <i className="fas fa-table"></i>&nbsp;Details
                <button className="btn btn-success btn-sm  float-right pl-4 pr-4" onClick={null}>
                    <i className="fas fa-edit"></i>
                </button>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Title</th>
            <td>{item.title}</td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">YouTube Video</th>
            <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item && item.embedCode, {ADD_TAGS: ['iframe']}) }}>
            </td>
        </tr>
    );
    return elements;
}
