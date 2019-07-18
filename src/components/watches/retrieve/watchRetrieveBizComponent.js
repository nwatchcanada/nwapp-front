// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


export default class WatchRetrieveBizComponent extends Component {
    render() {
        const {
            tags, name, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, streetMembership, isLoading, onClick, flashMessage
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/watches"><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-building"></i>&nbsp;{name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-building"></i>&nbsp;{name}
                </h1>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Watch Details
                        </h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;District details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                {district &&
                                    <tr>
                                        <th scope="row" className="bg-light">District</th>
                                        <td>{district.label}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Program</th>
                                    <td>Business</td>
                                </tr>
                                {associate &&
                                    <tr>
                                        <th scope="row" className="bg-light">Associate</th>
                                        <td>{associate.label}</td>
                                    </tr>
                                }
                                {primaryAreaCoordinator &&
                                    <tr>
                                        <th scope="row" className="bg-light">Primary Area Coordinator</th>
                                        <td>{primaryAreaCoordinator.label}</td>
                                    </tr>
                                }
                                {secondaryAreaCoordinator &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Area Coordinator</th>
                                        <td>{secondaryAreaCoordinator.label}</td>
                                    </tr>
                                }
                                {tags &&
                                    <tr>
                                        <th scope="row" className="bg-light">Tags</th>
                                        <td>
                                            {tags && tags.map(
                                                (tag, i) => <TagItem tag={tag} key={i} />)
                                            }
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <h2>
                            <i className="fas fa-road"></i>&nbsp;Street Membership
                        </h2>

                        <StreetMembershipTable streetMembership={streetMembership} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <form>
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </button>
                                <Link to="/watches" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
        );
    }
}


class StreetMembershipRow extends Component {
    render() {
        const { streetAddress, streetNumberStart, streetNumberFinish, streetName, streetType, streetDirection } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumberStart}
                </td>
                <td>
                    {streetNumberFinish}
                </td>
                <td>
                    {streetName}
                </td>
                <td>
                    {streetType}
                </td>
                <td>
                    {streetDirection}
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
                            streetNumberFinish={rowData.streetNumberFinish}
                            streetName={rowData.streetName}
                            streetType={rowData.streetType}
                            streetDirection={rowData.streetDirection}
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
                                <th>Street # (Finish)</th>
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


class TagItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}
