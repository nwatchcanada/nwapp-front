import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


/**
 *  Component is responsible for rendering a single column header and the
 *  following functionality:
 *
 *  1. Make headers clickable.
 *  2. If clicked for the first time then let the container know of the user
 *     click event and add an ascending sort icon to this header.
 *  3. If clicked again then let the container know of the click event and add
 *     a descending sort icon to this header.
 *  4. If clicked again then reset the table to no longer have sorting. Also
 *     let the container know of the click event.
 */
class TableSortableCol extends Component {
    render() {
        const { onTableColumnClick, text, columnKey, selectedColumnKey, selectedColumnOrder } = this.props

        if (selectedColumnKey === columnKey && selectedColumnOrder === "asc") {
            return (
                <th>
                    <Link onClick={()=>{ onTableColumnClick(columnKey, "desc"); }}>
                    {text}&nbsp;<i className="fas fa-sort-up"></i>
                    </Link>
                </th>
            );
        }
        else if (selectedColumnKey === columnKey && selectedColumnOrder === "desc") {
            return (
                <th>
                    <Link onClick={()=>{ onTableColumnClick(null, null); }}>
                    {text}&nbsp;<i className="fas fa-sort-down"></i>
                    </Link>
                </th>
            );

        // CASE 3 OF 3:
        // Column was never selected before.
        } else {
            return (
                <th>
                    <Link onClick={()=>{ onTableColumnClick(columnKey, "asc"); }}>
                    {text}
                    </Link>
                </th>
            );
        }
    };
}


/**
 *  Component is responsible for rendering a single table row.
 */
class TableRow extends Component {
    render() {
        const { slug, icon, firstName, lastName, phone, email, financialUrl, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td><i className={`fas fa-${icon}`}></i></td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                    <a href={financialUrl} target="_blank" rel="noopener noreferrer">
                        View&nbsp;<i className="fas fa-external-link-alt"></i>
                    </a>
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


class AreaCoordinatorActiveListComponent extends Component {
    render() {
        const { selectedColumnKey, selectedColumnOrder, onTableColumnClick, tableData, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-horse-head"></i>&nbsp;Area Coordinators
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/area-coordinators/add/step-1" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Area Coordinator</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/area-coordinators/active/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Area Coordinators</span>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="step-navigation float-right">
                            <div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-user-check"></i>&nbsp;<span className="">Active (3)</span>
                                </strong>
                            </div>
                            <div id="step-2" className="st-grey">
                                <Link to="/area-coordinators/inactive">
                                    <i className="fas fa-user-times"></i>&nbsp;<span className="">Inactive (3)</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2><i className="fas fa-user-check"></i>&nbsp;Active List</h2>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <TableSortableCol
                                            onTableColumnClick={onTableColumnClick}
                                            selectedColumnKey={selectedColumnKey}
                                            selectedColumnOrder={selectedColumnOrder}
                                            text="First Name"
                                            columnKey="first_name"
                                        />
                                        <TableSortableCol
                                            onTableColumnClick={onTableColumnClick}
                                            selectedColumnKey={selectedColumnKey}
                                            selectedColumnOrder={selectedColumnOrder}
                                            text="Last Name"
                                            columnKey="last_name"
                                        />
                                        <TableSortableCol
                                            onTableColumnClick={onTableColumnClick}
                                            selectedColumnKey={selectedColumnKey}
                                            selectedColumnOrder={selectedColumnOrder}
                                            text="Phone"
                                            columnKey="phone"
                                        />
                                        <TableSortableCol
                                            onTableColumnClick={onTableColumnClick}
                                            selectedColumnKey={selectedColumnKey}
                                            selectedColumnOrder={selectedColumnOrder}
                                            text="Email"
                                            columnKey="email"
                                        />
                                        <th>Financials</th>
                                        <th>Details</th>
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

export default AreaCoordinatorActiveListComponent;
