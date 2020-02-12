import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../../../constants/api';


export default class AdminDistrictSearchResultComponent extends Component {
    render() {
        const {
            districts, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick, onDistrictClick
        } = this.props;
        const hasNoDistricts = districts.length <= 0;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/settings/districts`}><i className="fas fa-users"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/settings/district/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Districts Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoDistricts
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/admin/districts/search">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {districts && districts.map(
                                    (district) => <CardComponent district={district} key={district.id} isLoading={isLoading} onDistrictClick={onDistrictClick} />)
                                }
                            </div>
                        }

                        <div className="float-right">
                            {hasPrevious &&
                                <Link onClick={onPreviousClick}><i class="fas fa-arrow-circle-left"></i>&nbsp;Previous</Link>
                            }&nbsp;&nbsp;
                            {hasNext &&
                                <Link onClick={onNextClick}>Next&nbsp;<i class="fas fa-arrow-circle-right"></i></Link>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



class CardComponent extends Component {
    render() {
        const { district, isLoading } = this.props;
        let aURL = "";
        if (district.typeOf === 3) {
            aURL = "/admin/settings/district/com/"+district.slug;
        } else if (district.typeOf === 2) {
            aURL = "/admin/settings/district/biz/"+district.slug;
        } else if (district.typeOf === 1) {
            aURL = "/admin/settings/district/rez/"+district.slug;
        }
        return (
            <div className="col-sm-3" id={district.slug}>
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={aURL}>
                                {district.typeOf === 3 &&
                                    <strong><i className="fas fa-university"></i>&nbsp;{district.name}</strong>
                                }
                                {district.typeOf === 2 &&
                                    <strong><i className="fas fa-building"></i>&nbsp;{district.name}</strong>
                                }
                                {district.typeOf === 1 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{district.name}</strong>
                                }
                            </Link>
                        </h5>
                        <p className="card-text">
                            {district.description}
                        </p>
                        <Link to={aURL} type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
