import React, { Component } from 'react';
import { Link } from "react-router-dom";


class TableRow extends Component {
    render() {
        const { slug, number, name, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td>{number}</td>
                <td>{name}</td>
                <td>
                    <a href={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </a>
                </td>
            </tr>
        );
    }
}


class DistrictsListComponent extends Component {
    render() {
        const { tableData } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-torii-gate"></i>&nbsp;Districts
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-torii-gate"></i>&nbsp;Districts</h1>
                <div className="row">
                    <div className="col-md-12">

                        <h2>List</h2>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>District #</th>
                                        <th>Name</th>
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

export default DistrictsListComponent;
