import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../constants/api";


export default class ResourcesListComponent extends Component {
    render() {
        const { tableData, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-atlas"></i>&nbsp;Resources
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-atlas"></i>&nbsp;Resources</h1>
                <div className="row">
                    <div className="col-md-12">

                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/resource/add" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add a resource</div>
                            </div>
                        </section>

                        <h2>List</h2>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Resource #</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tableData && tableData.map(
                                        (tableDatum, i) => <TableRow datum={tableDatum} key={i} />)
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


class TableRow extends Component {
    render() {
        const { slug, number, name, category, typeOf } = this.props.datum;

        return (
            <tr slug={slug}>
                <td>{number}</td>
                <td>{name}</td>
                <td>{category}</td>
                <td><PrettyTypeOf typeOf={typeOf} /></td>
                <td>
                    <Link to={`/settings/resource/${slug}/update`} className="btn btn-primary pl-4 pr-4">
                        <i className="fas fa-edit"></i>&nbsp;Edit
                    </Link>&nbsp;&nbsp;&nbsp;
                    <Link to={`/settings/resource/${slug}/delete`} className="btn btn-danger pl-4 pr-4">
                        <i className="fas fa-minus"></i>&nbsp;Remove
                    </Link>
                </td>
            </tr>
        );
    }
}


export const PrettyTypeOf = ({ typeOf }) => {
    if (typeOf === LINK_RESOURCE_TYPE_OF) {
        return "Link";
    } else if (typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
        return "YouTube Video";
    } else if (typeOf === IMAGE_RESOURCE_TYPE_OF) {
        return "Image";
    } else if (typeOf === FILE_RESOURCE_TYPE_OF) {
        return "File";
    } else {
        return null;
    }
}
