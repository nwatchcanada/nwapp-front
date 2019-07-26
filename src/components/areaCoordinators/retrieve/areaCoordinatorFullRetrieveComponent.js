// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class AreaCoordinatorFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { slug, flashMessage } = this.props;
        const {
            typeOf, errors,
            bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
            rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
            streetNumber, streetName, streetType, streetTypeOther, streetDirection,
            watchSlug, watchIcon, watchName,
            dateOfBirth, howDidYouHear, howDidYouHearOther,
        } = this.props.areaCoordinatorData;
        const isBizTypeOf = typeOf === BUSINESS_TYPE_OF;
        const isRezOrCom = typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF;

        let areaCoordinatorshipClass;
        if (typeOf === BUSINESS_TYPE_OF) {
            areaCoordinatorshipClass = "Business";
        }
        else if (typeOf === RESIDENCE_TYPE_OF) {
            areaCoordinatorshipClass = "Residential";
        }
        else if (typeOf === COMMUNITY_CARES_TYPE_OF) {
            areaCoordinatorshipClass = "Community Cares";
        }

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/area-coordinators"><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-horse-head"></i>&nbsp;Argyle
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-horse-head"></i>&nbsp;View Area Coordinator</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/area-coordinator/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
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
                                    <th scope="row" className="bg-light">AreaCoordinatorship Class</th>
                                    <td>{areaCoordinatorshipClass}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Contact
                                    </th>
                                </tr>
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{bizCompanyName}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Contact First Name</th>
                                        <td>{bizContactFirstName}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Contact Last Name</th>
                                        <td>{bizContactLastName}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Primary Phone #</th>
                                        <td>{bizPrimaryPhone}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Phone #</th>
                                        <td>{bizSecondaryPhone}</td>
                                    </tr>
                                }
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Email</th>
                                        <td>{bizEmail}</td>
                                    </tr>
                                }

                                {isRezOrCom &&
                                    <tr>
                                        <th scope="row" className="bg-light">First Name</th>
                                        <td>{rezFirstName}</td>
                                    </tr>
                                }
                                {isRezOrCom &&
                                    <tr>
                                        <th scope="row" className="bg-light">Last Name</th>
                                        <td>{rezLastName}</td>
                                    </tr>
                                }
                                {isRezOrCom &&
                                    <tr>
                                        <th scope="row" className="bg-light">Primary Phone #</th>
                                        <td>{rezPrimaryPhone}</td>
                                    </tr>
                                }
                                {isRezOrCom &&
                                    <tr>
                                        <th scope="row" className="bg-light">Secondary Phone #</th>
                                        <td>{rezSecondaryPhone}</td>
                                    </tr>
                                }
                                {isRezOrCom &&
                                    <tr>
                                        <th scope="row" className="bg-light">Email</th>
                                        <td>{rezEmail}</td>
                                    </tr>
                                }




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
                                    <td>{streetType}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Type (Other)</th>
                                    <td>{streetTypeOther}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Direction</th>
                                    <td>{streetDirection}</td>
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
                                {dateOfBirth &&
                                    <tr>
                                        <th scope="row" className="bg-light">Date of Birth</th>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{dateOfBirth}</Moment>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">How did you hear about us?</th>
                                    <td>{howDidYouHear}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did you hear about us? (Other)</th>
                                    <td>{howDidYouHearOther}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <Link to={`/area-coordinators/${slug}/promote`}>
                                                    Promote&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`/area-coordinators/${slug}/demote`}>
                                                    Demote&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <Link to={`/area-coordinators/${slug}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link>
                                <Link to={`/area-coordinators`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
