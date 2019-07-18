// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


export default class WatchRetrieveComComponent extends Component {
    render() {
        const {
            name, description, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, isLoading, onClick, flashMessage, streetsArray
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
                            <i className="fas fa-university"></i>&nbsp;{name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                   <i className="fas fa-university"></i>&nbsp;{name}
                </h1>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
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
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">District</th>
                                    <td>{district.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Program</th>
                                    <td>Community Cares</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate</th>
                                    <td>{associate.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Area Coordinator</th>
                                    <td>{primaryAreaCoordinator.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Area Coordinator</th>
                                    <td>{secondaryAreaCoordinator.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Addresses</th>
                                    <td>
                                        <ul>
                                            {streetsArray && streetsArray.map(
                                                (tableDatum, i) => <StreetAddressBulletItem datum={tableDatum} key={i} />)
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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


class StreetAddressBulletItem extends Component {
    render() {
        const { streetAddress } = this.props.datum;
        return (
            <li>{streetAddress}</li>
        );
    }
}
