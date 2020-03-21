import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BUSINESS_TYPE_OF } from "../../../../constants/api";


export default class AdminStaffFullRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, staff, isLoading, errors } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/staffs`}><i className="fas fa-user-check"></i>&nbsp;Staffs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}</h1>

                {staff.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This staff is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/staff/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/staff/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/staff/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-6" className="st-grey">
                            <Link to={`/admin/staff/${slug}/community/score-points`}>
                                <span className="num"><i className="fas fa-smile"></i>&nbsp;</span><span className="">Community</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-7" className="st-grey">
                            <Link to={`/admin/staff/${slug}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
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
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Type of Client</th>
                                    <td>{staff && staff.typeOfLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        <Link to={`/admin/staff/${slug}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {staff && staff.organizationName && staff.roleId === BUSINESS_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{staff.organizationName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{staff.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${staff.primaryPhoneE164}`}>{staff.primaryPhoneNational}</a></td>
                                </tr>
                                {staff && staff.secondaryPhoneNational &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Telephone</th>
                                        <td><a href={`tel:${staff.primaryPhoneE164}`}>{staff.secondaryPhoneNational}</a></td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${staff.email}`}>{staff.email}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {staff.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {staff.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/admin/staff/${slug}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={staff.googleMapsUrl} target="_blank">{staff.address}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/admin/staff/${slug}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {staff && staff.yearOfBirth
                                            ? staff.yearOfBirth
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{staff.genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{staff.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {staff.tags && staff.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY">{staff.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{staff && staff.howDidYouHearLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What do you expect from NW?</th>
                                    <td>{staff && staff.expectationLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What does NW mean to you?</th>
                                    <td>{staff && staff.meaningLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Are you willing to willing_to_volunteer as a area coordinator / staff?</th>
                                    <td>{staff && staff.willingToVolunteerLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is there another staff of your household which is registered with us?</th>
                                    <td>
                                        {staff && staff.anotherHouseholdMemberRegistered
                                            ? "Yes"
                                            : "No"
                                        }
                                    </td>
                                </tr>
                                {staff && staff.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people are in your household?</th>
                                        <td>{staff && staff.totalHouseholdCount}</td>
                                    </tr>
                                }
                                {staff && staff.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people (including yourself) over the age of 18 are in your household?</th>
                                        <td>{staff && staff.over18YearsHouseholdCount}</td>
                                    </tr>
                                }
                                {staff && staff.organizationEmployeeCount &&
                                    <tr>
                                        <th scope="row" className="bg-light">The employee count at this staff's organization</th>
                                        <td>{staff && staff.organizationEmployeeCount}</td>
                                    </tr>
                                }
                                {staff && staff.organizationFoundingYear &&
                                    <tr>
                                        <th scope="row" className="bg-light">The year this organization was founded</th>
                                        <td>{staff && staff.organizationFoundingYear}</td>
                                    </tr>
                                }


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY hh:mm:ss a">{staff.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{staff.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY hh:mm:ss a">{staff.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{staff.lastModifiedBy}</td>
                                </tr>



                            </tbody>
                        </table>
                    </div>
                </div>


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
