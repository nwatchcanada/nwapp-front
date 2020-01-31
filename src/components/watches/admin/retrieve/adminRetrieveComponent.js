import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF,
} from "../../../../constants/api";


export default class AdminWatchRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, watch, isLoading } = this.props;

        let aURL = "";
        if (watch !== undefined && watch !== null) {
            switch(parseInt(watch.typeOf)) {
                case RESIDENCE_TYPE_OF:
                    aURL = "/admin/settings/district/rez/" + watch.districtSlug;
                    break;
                case BUSINESS_TYPE_OF:
                    aURL = "/admin/settings/district/biz/" + watch.districtSlug;
                    break;
                case COMMUNITY_CARES_TYPE_OF:
                    aURL = "/admin/settings/district/com/" + watch.districtSlug;
                    break;
                default:
                    break;
            }
        }


        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watches`}><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{watch && watch.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{watch && watch.name}</h1>

                {watch.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This watch is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-table"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/watch/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/admin/watch/${slug}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Watch Details
                        </h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Information
                                        <Link to={`/admin/watch/${slug}/update/info`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{watch && watch.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{watch && watch.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">District</th>
                                    <td>
                                        <a href={aURL} target="_blank">
                                            {watch && watch.districtName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                                {watch && watch.tags &&
                                    <tr>
                                        <th scope="row" className="bg-light">Tags</th>
                                        <td>
                                            {watch.tags && watch.tags.map(
                                                (tag, i) => <TagItem tag={tag} key={i} />)
                                            }
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {watch && watch.streetMembership &&
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            <h2>
                                <i className="fas fa-road"></i>&nbsp;Street Membership
                                <Link to={`/admin/watch/${slug}/update/street`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;
                                </Link>
                            </h2>

                            <StreetMembershipTable streetMembership={watch.streetMembership} />
                        </div>
                    </div>
                }




            </div>
        );
    }
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


class StreetMembershipRow extends Component {
    render() {
        const { streetAddress, streetNumberStart, streetNumberEnd, streetName, streetTypeLabel, streetDirectionLabel } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumberStart}
                </td>
                <td>
                    {streetNumberEnd}
                </td>
                <td>
                    {streetName}
                </td>
                <td>
                    {streetTypeLabel}
                </td>
                <td>
                    {streetDirectionLabel}
                </td>
            </tr>
        );
    }
}


class StreetMembershipTable extends Component {
    render() {
        const { streetMembership } = this.props;

        let elements = [];
        if (streetMembership !== undefined && streetMembership !== null) {
            for (let i = 0; i < streetMembership.length; i++) {
                let rowData = streetMembership[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <StreetMembershipRow
                            key={rowData.streetAddress}
                            streetAddress={rowData.streetAddress}
                            streetNumberStart={rowData.streetNumberStart}
                            streetNumberEnd={rowData.streetNumberEnd}
                            streetName={rowData.streetName}
                            streetTypeLabel={rowData.streetTypeLabel}
                            streetDirectionLabel={rowData.streetDirectionLabel}
                        />
                    );
                }
            }
        }

        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Street # (Start)</th>
                                <th>Street # (End)</th>
                                <th>Street Name</th>
                                <th>Street Type</th>
                                <th>Direction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
