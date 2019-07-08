import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


export default class FinancialRetrieveComponent extends Component {
    render() {
        const { flashMessage, slug } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/financials/all"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-credit-card"></i>&nbsp;Details
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-credit-card"></i>&nbsp;Financial Details</h1>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Transaction
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order Start Date</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order Completion Date</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Member Name</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Date</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID(s) #</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Labour</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Materials</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total Quote</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Labour</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Materials</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total Tax</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Service Fee</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Service Fee Payment Date</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Service Fee Paid</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account Balance</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light"># of Visits</th>
                                    <td>xxx</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Operations</th>
                                    <td>xxx</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <Link to={`/financial/${slug}/update`} className="btn btn-warning btn-lg mt-4 float-right pl-4 pr-4">
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </Link>
                            <Link to="/financials/all" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i> Back
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
