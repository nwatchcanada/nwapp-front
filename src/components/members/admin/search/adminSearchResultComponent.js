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

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../../constants/api';


export default class AdminMemberSearchResultComponent extends Component {
    render() {
        const {
            members, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick, onMemberClick
        } = this.props;
        const hasNoMembers = members.length <= 0;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/members`}><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/members/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Members Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoMembers
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/admin/members/search">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {members && members.map(
                                    (member) => <CardComponent member={member} key={member.id} isLoading={isLoading} onMemberClick={onMemberClick} />)
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
        const { member, isLoading } = this.props;
        return (
            <div className="col-sm-3" id={member.slug}>
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/admin/member/${member.slug}`}>
                                {member.typeOf === 3 &&
                                    <strong><i className="fas fa-building"></i>&nbsp;{member.organizationName}</strong>
                                }
                                {member.typeOf === 2 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{member.firstName}&nbsp;{member.lastName}</strong>
                                }
                                {member.typeOf === 1 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{member.firstName}&nbsp;{member.lastName}</strong>
                                }
                            </Link>
                        </h5>
                        <p className="card-text">
                            {member.streetAddress}<br />
                            {member.city}, {member.province}, {member.postalCode}<br />
                            <a href={`email:${member.email}`}>{member.email}</a><br />
                            <a href={`tel:${member.primaryPhoneE164}`}>{member.primaryPhoneNational}</a>
                        </p>
                        <Link to={`/admin/member/${member.slug}`} type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
