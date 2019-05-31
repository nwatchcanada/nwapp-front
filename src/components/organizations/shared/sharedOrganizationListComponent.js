import React, { Component } from 'react';
// import { Link } from "react-router-dom";


class TableRow extends Component {
    render() {
        const { schema, name, absoluteUrl } = this.props.datum;
        return (
            <tr>
                <td>{schema}</td>
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


class SharedOrganizationListComponent extends Component {
    render() {
        const { tableData } = this.props;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                <h1>System Tenants</h1>

                <div className="col-sm-12 mx-auto mt-4 pt-4">
                    <h2>Organizations</h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Subdomain</th>
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
            </main>
                </div>
            </div>
        );
    }
}

export default SharedOrganizationListComponent;
