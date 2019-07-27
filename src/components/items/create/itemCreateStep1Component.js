// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemCreateStep1Component extends Component {
    render() {
        const { onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Type</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Details</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="card-group row">
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-fire fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Incident</h3>
                                <p className="card-text">Add a residential district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, INCIDENT_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-glass-cheers fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Event</h3>
                                <p className="card-text">Add a business district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, EVENT_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-exclamation-circle fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Concern</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, CONCERN_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-info-circle fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Information</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, INFORMATION_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">

                    <Link to="/items" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </main>
        );
    }
}

export default ItemCreateStep1Component;
