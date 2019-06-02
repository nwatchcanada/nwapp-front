import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DistrictsListComponent extends Component {
    render() {
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

                    </div>
                </div>
            </div>
        );
    }
}

export default DistrictsListComponent;
