// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


export default class AdminMemberCreateStep8Component extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const {
            typeOf, errors, onSubmitClick, isLoading,
            organizationName, organizationTypeOf, firstName, lastName, primaryPhone, secondaryPhone, email,
            streetNumber, streetName, streetType, streetTypeLabel, streetTypeOther, apartmentUnit, streetDirection, streetDirectionLabel, postalCode,
            watchSlug, watchIcon, watchName,
            tags, tagOptions, yearOfBirth, gender, genderLabel, howDidYouHear, howDidYouHearLabel, howDidYouHearOptions, howDidYouHearOther,
            meaningLabel, meaning, expectationLabel, expectations, willingToVolunteer, willingToVolunteerLabel, anotherHouseholdMemberRegistered, anotherHouseholdMemberRegisteredLabel, totalHouseholdCount, under18YearsHouseholdCount,
            organizationEmployeeCount, organizationFoundingYear, organizationTypeOfLabel,
        } = this.props;
        const isBizTypeOf = typeOf === BUSINESS_TYPE_OF;
        const isRezOrCom = typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF;

        let membershipClass;
        if (typeOf === BUSINESS_TYPE_OF) {
            membershipClass = "Business";
        }
        else if (typeOf === RESIDENCE_TYPE_OF) {
            membershipClass = "Residential";
        }
        else if (typeOf === COMMUNITY_CARES_TYPE_OF) {
            membershipClass = "Community Cares";
        }

        // Set the how did you hear.
        let howDidYouHearFinalLabel = howDidYouHearLabel;
        if (howDidYouHear === "other") {
            howDidYouHearFinalLabel = howDidYouHearOther;
        }

        // This code checks to see if we need to display the household count fields.
        let showHouseholdCount = false;
        try {
            showHouseholdCount = parseInt(anotherHouseholdMemberRegistered) === 0;
        } catch (error) {
            // Do nothing.
        }

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Member
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/members/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/members/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/admin/members/add/step-3">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/admin/members/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/admin/members/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to="/admin/members/add/step-6">
                                <span className="num">6.</span><span className="">Watch</span>
                            </Link>
                        </div>
                         <div id="step-7" className="st-grey">
                            <Link to="/admin/members/add/step-7">
                                <span className="num">7.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                        <div id="step-8" className="st-grey active">
                            <strong>
                                <span className="num">8.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the member:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Membership Class</th>
                                    <td>{membershipClass}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Contact
                                    </th>
                                </tr>
                                {typeOf === BUSINESS_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{organizationName}</td>
                                    </tr>
                                }
                                {typeOf === BUSINESS_TYPE_OF &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Type Of</th>
                                        <td>{organizationTypeOf}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">First Name</th>
                                    <td>{firstName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Name</th>
                                    <td>{lastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Phone #</th>
                                    <td>{primaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Phone #</th>
                                    <td>{secondaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td>{email}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-address-book"></i>&nbsp;Address
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
                                {streetTypeOther &&
                                    <tr>
                                        <th scope="row" className="bg-light">Street Type (Other)</th>
                                        <td>{streetTypeOther}</td>
                                    </tr>

                                }
                                {apartmentUnit &&
                                    <tr>
                                        <th scope="row" className="bg-light">Apartment Unit</th>
                                        <td>{apartmentUnit}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Street Direction</th>
                                    <td>{streetDirectionLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Postal Code</th>
                                    <td>{postalCode}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-shield-alt"></i>&nbsp;Watch
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>
                                        <a href={`/watch-biz/${watchSlug}`} target="_blank" rel="noopener noreferrer">
                                            <i className={`fas fa-${watchIcon}`}></i>&nbsp;{watchName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags</th>
                                    <td>
                                        {tags && tags.map(
                                            (tag, i) => <TagItem tag={tag} key={i} />)
                                        }
                                    </td>
                                </tr>
                                {yearOfBirth &&
                                    <tr>
                                        <th scope="row" className="bg-light">Year of Birth</th>
                                        <td>
                                            {yearOfBirth}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did you hear about us?</th>
                                    <td>{howDidYouHearFinalLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What does NW mean to you?</th>
                                    <td>{meaningLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">What do you expect from NW?</th>
                                    <td>{expectationLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Are you willing to volunteer as a area coordinator / associate?</th>
                                    <td>{willingToVolunteerLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is there another member of your household which is registered with?</th>
                                    <td>{anotherHouseholdMemberRegisteredLabel}</td>
                                </tr>
                                {showHouseholdCount &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people are in your household?</th>
                                        <td>{totalHouseholdCount}</td>
                                    </tr>
                                }
                                {showHouseholdCount &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many people in your household are under the age of 18?</th>
                                        <td>{under18YearsHouseholdCount}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many employees does your business have?</th>
                                        <td>{organizationEmployeeCount}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">How many years has your organization been in operation?</th>
                                        <td>{organizationFoundingYear}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">What type of business is this?</th>
                                        <td>{organizationTypeOfLabel}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">User agrees to conditions</th>
                                    <td>Yes</td>
                                </tr>


                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onSubmitClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/admin/members/add/step-7" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


class TagItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}
