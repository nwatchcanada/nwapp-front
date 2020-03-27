import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BUSINESS_TYPE_OF } from "../../../../constants/api";
import { UserTypeOfIconHelper } from "../../../../constants/helper";


export default class AdminAssociateFullRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, associate, isLoading, errors } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <UserTypeOfIconHelper typeOfId={associate && associate.typeOf} />&nbsp;{associate && associate.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><UserTypeOfIconHelper typeOfId={associate && associate.typeOf} />&nbsp;{associate && associate.fullName}</h1>

                {associate.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This associate is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/associate/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/associate/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/associate/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-6" className="st-grey">
                            <Link to={`/admin/associate/${slug}/community/score-points`}>
                                <span className="num"><i className="fas fa-smile"></i>&nbsp;</span><span className="">Community</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-7" className="st-grey">
                            <Link to={`/admin/associate/${slug}/operations`}>
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
                                    <td>{associate && associate.typeOfLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        <Link to={`/admin/associate/${slug}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {associate && associate.organizationName && associate.typeOf === BUSINESS_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{associate.organizationName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{associate.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${associate.primaryPhoneE164}`}>{associate.primaryPhoneNational}</a></td>
                                </tr>
                                {associate && associate.secondaryPhoneNational &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Telephone</th>
                                        <td><a href={`tel:${associate.primaryPhoneE164}`}>{associate.secondaryPhoneNational}</a></td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${associate.email}`}>{associate.email}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {associate.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {associate.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/admin/associate/${slug}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={associate.googleMapsUrl} target="_blank">{associate.address}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/admin/associate/${slug}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {associate && associate.yearOfBirth
                                             ? associate.yearOfBirth
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{associate.genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{associate.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {associate.tags && associate.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{associate && associate.howDidYouHearLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What do you expect from NW?</th>
                                    <td>{associate && associate.expectationLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What does NW mean to you?</th>
                                    <td>{associate && associate.meaningLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Are you willing to willing_to_volunteer as a area coordinator / associate?</th>
                                    <td>{associate && associate.willingToVolunteerLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is there another associate of your household which is registered with us?</th>
                                    <td>
                                        {associate && associate.anotherHouseholdMemberRegistered
                                            ? "Yes"
                                            : "No"
                                        }
                                    </td>
                                </tr>
                                {associate && associate.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people are in your household?</th>
                                        <td>{associate && associate.totalHouseholdCount}</td>
                                    </tr>
                                }
                                {associate && associate.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people (including yourself) over the age of 18 are in your household?</th>
                                        <td>{associate && associate.over18YearsHouseholdCount}</td>
                                    </tr>
                                }
                                {associate && associate.organizationEmployeeCount &&
                                    <tr>
                                        <th scope="row" className="bg-light">The employee count at this associate's organization</th>
                                        <td>{associate && associate.organizationEmployeeCount}</td>
                                    </tr>
                                }
                                {associate && associate.organizationFoundingYear &&
                                    <tr>
                                        <th scope="row" className="bg-light">The year this organization was founded</th>
                                        <td>{associate && associate.organizationFoundingYear}</td>
                                    </tr>
                                }


                                {associate && associate.governing &&
                                    <AllGoverningDistrictsComponent
                                        governing={associate.governing}
                                    />
                                }


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY hh:mm:ss a">{associate.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{associate.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY hh:mm:ss a">{associate.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{associate.lastModifiedBy}</td>
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


function AllGoverningDistrictsComponent({ governing }) {
    let elements = [];
    for (let district of governing) {
        elements.push(
            <GoverningDistrictComponent district={district} key={district.slug} />
        );
    }
    return elements;
}


function GoverningDistrictComponent({ district }) {
    console.log(district);
    let elements = []
    elements.push(
        <tr className="bg-dark">
            <th scope="row" colSpan="2" className="text-light">
                <i className="fas fa-map"></i>&nbsp;Governing District
            </th>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Name</th>
            <td>
                <Link to={`/admin/settings/district/${district.typeOfCode}/${district.slug}`} target="_blank">
                    {district.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                </Link>
            </td>
        </tr>
    );
    elements.push(
        <tr>
            <th scope="row" className="bg-light">Description</th>
            <td>
                {district.description}
            </td>
        </tr>
    );
    return elements;
}
