import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SharedOrganizationCreateComponent extends Component {
    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/organizations"><i className="fas fa-table"></i>&nbsp;Organizations</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add</li>
                    </ol>
                </nav>
                 <h1><i className="fas fa-plus"></i>&nbsp;Add Organization</h1>
            </div>
        );
    }
}

export default SharedOrganizationCreateComponent;
