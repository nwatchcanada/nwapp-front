// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class StaffFullRetrieveComponent extends Component {
    render() {
        const { urlArgument, slug, flashMessage } = this.props;
        const {
            firstName, lastName, dateOfBirth, description, tags, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetDirection, locality, country, region, postal, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments,
            errors, isLoading, onClick,
            genderLabel, howHearLabel, streetTypeLabel, accountTypeLabel, isActiveLabel,
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff/${urlArgument}`}><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;Argyle
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Staff</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/staff/${urlArgument}/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Personal Information
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">First Name</th>
                                    <td>{firstName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Name</th>
                                    <td>{lastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{dateOfBirth}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags</th>
                                    <td>
                                        <ul>
                                            {tags && tags.map(
                                                (tag, i) => <UnorderedBulletItem tag={tag} key={i} />)
                                            }
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did you hear about us?</th>
                                    <td>{howHearLabel}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-tty"></i>&nbsp;Contact Information
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Phone</th>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mobile</th>
                                    <td>{mobile}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Work Email</th>
                                    <td>{workEmail}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Personal Email</th>
                                    <td>{personalEmail}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker"></i>&nbsp;Street Address
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Number</th>
                                    <td>{streetNumber}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Name</th>
                                    <td>{streetName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Type</th>
                                    <td>{streetTypeLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Direction</th>
                                    <td>{streetDirection}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Locality</th>
                                    <td>{locality}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Region</th>
                                    <td>{region}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Country</th>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Postal</th>
                                    <td>{postal}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-clinic-medical"></i>&nbsp;Emergency Contact
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{emergencyFullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Relationship</th>
                                    <td>{emergencyRelationship}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Telephone</th>
                                    <td>{emergencyTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Alternative Telephone</th>
                                    <td>{emergencyAlternativeTelephone}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-circle"></i>&nbsp;Account
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Additional Comments</th>
                                    <td>{additionalComments}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account Type</th>
                                    <td>{accountTypeLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is active?</th>
                                    <td>{isActiveLabel}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                            <Link to={`/staff/${urlArgument}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>


                    </div>
                </div>


            </div>
        );
    }
}


class UnorderedBulletItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <li value={value}>
                {label}
            </li>
        );
    };
}
