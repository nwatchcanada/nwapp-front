import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminMemberFullRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, member, isLoading, errors } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/members`}><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{member && member.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{member && member.fullName}</h1>

                {member && member.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This member is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/member/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/member/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/member/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-6" className="st-grey">
                            <Link to={`/admin/member/${slug}/community/score-points`}>
                                <span className="num"><i className="fas fa-smile"></i>&nbsp;</span><span className="">Community</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-7" className="st-grey">
                            <Link to={`/admin/member/${slug}/operations`}>
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
                                    <td>{member && member.typeOfLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        <Link to={`/admin/member/${slug}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {member && member.organizationName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{member && member.organizationName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{member && member.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${member && member.primaryPhoneE164}`}>{member && member.primaryPhoneNational}</a></td>
                                </tr>
                                {member && member.secondaryPhoneNational &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Telephone</th>
                                        <td><a href={`tel:${member.primaryPhoneE164}`}>{member.secondaryPhoneNational}</a></td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${member && member.email}`}>{member && member.email}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {member && member.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {member && member.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/admin/member/${slug}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={member && member.googleMapsUrl} target="_blank">{member && member.address}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-shield-alt"></i>&nbsp;Watch
                                        <Link to={`/admin/member/${slug}/update/watch`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Membership</th>
                                    <td>
                                        <a href={`/admin/watch/${member && member.watchSlug}`} target="_blank">
                                            {member && member.watchName}{member && member.watchIsVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/admin/member/${slug}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {member && member.yearOfBirth
                                            ? member.yearOfBirth
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{member && member.genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{member && member.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {member && member.tags && member.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {member && <Moment format="MM/DD/YYYY">{member.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{member && member.howDidYouHearLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What do you expect from NW?</th>
                                    <td>{member && member.expectationLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What does NW mean to you?</th>
                                    <td>{member && member.meaningLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Are you willing to willing_to_volunteer as a area coordinator / associate?</th>
                                    <td>{member && member.willingToVolunteerLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is there another member of your household which is registered with us?</th>
                                    <td>
                                        {member && member.anotherHouseholdMemberRegistered
                                            ? "Yes"
                                            : "No"
                                        }
                                    </td>
                                </tr>
                                {member && member.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people are in your household?</th>
                                        <td>{member && member.totalHouseholdCount}</td>
                                    </tr>
                                }
                                {member && member.anotherHouseholdMemberRegistered === false &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people (including yourself) over the age of 18 are in your household?</th>
                                        <td>{member && member.over18YearsHouseholdCount}</td>
                                    </tr>
                                }
                                {member && member.organizationEmployeeCount &&
                                    <tr>
                                        <th scope="row" className="bg-light">The employee count at this member's organization</th>
                                        <td>{member && member.organizationEmployeeCount}</td>
                                    </tr>
                                }
                                {member && member.organizationFoundingYear &&
                                    <tr>
                                        <th scope="row" className="bg-light">The year this organization was founded</th>
                                        <td>{member && member.organizationFoundingYear}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Do you identify as any of the following?</th>
                                    <td>
                                        <ul style={{ listStyleType: "none" }}>
                                        {member && member.isAboriginal
                                            ? <li><i className="fas fa-check-circle"></i>&nbsp;Aboriginal</li>
                                            : <li><i className="fas fa-times-circle"></i>&nbsp;Aboriginal</li>
                                        }
                                        {member && member.isTransgender
                                            ? <li><i className="fas fa-check-circle"></i>&nbsp;Transgender</li>
                                            : <li><i className="fas fa-times-circle"></i>&nbsp;Transgender</li>
                                        }
                                        {member && member.isVisibleMinority
                                            ? <li><i className="fas fa-check-circle"></i>&nbsp;Visible Minority</li>
                                            : <li><i className="fas fa-times-circle"></i>&nbsp;Visible Minority</li>
                                        }
                                        {member && member.isDisabledOrHasBarriers
                                            ? <li><i className="fas fa-check-circle"></i>&nbsp;Disabled or has Phyiscal Barriers</li>
                                            : <li><i className="fas fa-times-circle"></i>&nbsp;Disabled or has Phyiscal Barriers</li>
                                        }
                                        {member && member.isOverFiftyFive
                                            ? <li><i className="fas fa-check-circle"></i>&nbsp;Over 55+</li>
                                            : <li><i className="fas fa-times-circle"></i>&nbsp;Over 55+</li>
                                        }
                                        </ul>
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-share-alt"></i>&nbsp;Social Credit
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Badges</th>
                                    <td>
                                        {member && member.badges && member.badges.length > 0
                                            ? <div>
                                                {member.badges && member.badges.map(
                                                    (badge) => <BadgeItem badge={badge} key={badge.uuid} />)
                                                }
                                            </div>
                                            : <div>
                                                -
                                            </div>
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {member && <Moment format="MM/DD/YYYY hh:mm:ss a">{member.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{member.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {member && <Moment format="MM/DD/YYYY hh:mm:ss a">{member.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{member.lastModifiedBy}</td>
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


class BadgeItem extends Component {
    render() {
        const { uuid, typeOfLabel, icon } = this.props.badge;
        return (
            <div>
                <span className="badge badge-info badge-lg" value={uuid}><i className={`fas fa-${icon}`}></i>&nbsp;{typeOfLabel}</span>
            </div>
        );
    };
}
