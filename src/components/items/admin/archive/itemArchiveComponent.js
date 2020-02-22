import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class ItemArchiveComponent extends Component {
    render() {
        const { itemData, onClick, onBack } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Item</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/item/${itemData.slug}`}>
                                <i className="fas fa-map-pin"></i>&nbsp;{itemData.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-archive"></i>&nbsp;Archive
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-archive"></i>&nbsp;Archive</h1>

                <div className="jumbotron">
                    <h1 className="display-4">Archive</h1>
                    <p className="lead">This will make the item no longer be listed.</p>
                    <hr className="my-4" />
                    <p>I understood and I want to proceed...</p>
                    <p className="lead">
                        <button className="btn btn-secondary btn-lg" onClick={onBack}>
                            <i className="fas fa-times-circle"></i>&nbsp;Cancel
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-success btn-lg" onClick={onClick}>
                            <i className="fas fa-check-circle"></i>&nbsp;Save
                        </button>
                    </p>
                </div>

                <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">

                </div>

            </div>
        );
    }
}
