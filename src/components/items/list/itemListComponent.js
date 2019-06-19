import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


export default class ItemListComponent extends Component {
    render() {
        const { tableData, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Items
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map-pin"></i>&nbsp;Items</h1>
                <div className="row">
                    <div className="col-md-12">

                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/item/add/step-1" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add a item</div>
                            </div>
                        </section>

                        <h2>List</h2>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Item #</th>
                                        <th>Name</th>
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
        const { slug, number, name, typeOf, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td>{number}</td>
                <td>{name}</td>
                <td>
                    <PrettyTypeOf typeOf={typeOf} />
                </td>
                <td>
                    <a href={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </a>
                </td>
            </tr>
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
