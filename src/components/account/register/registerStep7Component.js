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


export default class RegisterStep7Component extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const {
            returnURL, typeOf, errors, onClick, isLoading,
            bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
            rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
            streetNumber, streetName, streetType, streetTypeOther, streetDirection,
            watchSlug, watchIcon, watchName,
            tags, dateOfBirth, howDidYouHear, howDidYouHearOther
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

        return (
            <main id="main" role="main">
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Register
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/register/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={returnURL}>
                                <span className="num">2.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/register/step-3">
                                <span className="num">3.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/register/step-4">
                                <span className="num">4.</span><span className="">Watch</span>
                            </Link>
                        </div>
                         <div id="step-5" className="st-grey">
                            <Link to="/register/step-5">
                                <span className="num">5.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to="/register/step-6">
                                <span className="num">6.</span><span className="">Review</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num">7.</span><span className="">Review</span>
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
                                <tr>
                                    <th scope="row" className="bg-light">Tags</th>
                                    <td>
                                        {tags && tags.map(
                                            (tag, i) => <TagItem tag={tag} key={i} />)
                                        }
                                    </td>
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


                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/register/step-6" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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