import React from "react";
// import Moment from 'react-moment';
// import 'moment-timezone';
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

import {
    ItemIconHelper, ItemTypeOfLabelHelper, ItemFormatTypeLabelHelper, ItemFormatTypeIconHelper
} from "../../../../constants/helper";
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
                    <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-category`}>
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
            <tr>
                <th scope="row" className="bg-light">Format Type</th>
                <td>
                    <ItemFormatTypeIconHelper formatTypeId={item && item.formatType} />&nbsp;
                    <ItemFormatTypeLabelHelper formatTypeId={item && item.formatType} />
                </td>
            </tr>

            {/* DETAILS */}

            {item && item.formatType === LINK_RESOURCE_TYPE_OF &&
                <LinkItemComponent item={item} />
            }
            {item && item.formatType === YOUTUBE_VIDEO_RESOURCE_TYPE_OF &&
                <YouTubeItemComponent item={item} />
            }
            {item && item.formatType === IMAGE_RESOURCE_TYPE_OF &&
                <ImageItemComponent item={item} />
            }
            {item && item.formatType === FILE_RESOURCE_TYPE_OF &&
                <FileItemComponent item={item} />
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
                <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-details`}>
                    <i className="fas fa-edit"></i>
                </Link>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Description</th>
            <td>{item && item.description}</td>
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
                <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-details`}>
                    <i className="fas fa-edit"></i>
                </Link>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Title</th>
            <td>{item && item.title}</td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">YouTube Video</th>
            <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item && item.embedCode, {ADD_TAGS: ['iframe']}) }}></td>
        </tr>
    );
    return elements;
}


export function ImageItemComponent({ item }) {
    const elements = [];
    elements.push(
        <tr className="bg-dark">
            <th scope="row" colSpan="2" className="text-light">
                <i className="fas fa-table"></i>&nbsp;Details
                <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-details`}>
                    <i className="fas fa-edit"></i>
                </Link>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Title</th>
            <td>{item && item.title}</td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Image</th>
            <td>
                <img
                    src={item && item.resourceImage && item.resourceImage.fileUrl}
                    alt={item && item.resourceImage && item.resourceImage.title}
                />
            </td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Description</th>
            <td>{item && item.description}</td>
        </tr>
    );
    return elements;
}


export function FileItemComponent({ item }) {
    const elements = [];
    elements.push(
        <tr className="bg-dark">
            <th scope="row" colSpan="2" className="text-light">
                <i className="fas fa-table"></i>&nbsp;Details
                <Link className="btn btn-success btn-sm float-right pl-4 pr-4" to={`/admin/item/${item && item.slug}/update-details`}>
                    <i className="fas fa-edit"></i>
                </Link>
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Title</th>
            <td>{item && item.title}</td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">File</th>
            <td>
                <a href={item && item.resourceFile && item.resourceFile.fileUrl} target="_blank">
                    {item && item.resourceFile && item.resourceFile.title}
                </a>
            </td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Description</th>
            <td>{item && item.description}</td>
        </tr>
    );
    return elements;
}
