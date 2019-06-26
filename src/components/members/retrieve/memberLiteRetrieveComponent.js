import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


export default class MemberLiteRetrieveComponent extends Component {
    render() {
        const { urlArgument, slug, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/members/${urlArgument}`}><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;Argyle
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Member</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/members/${urlArgument}/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-5">
                                <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" />
                            </div>
                            <div className="col-sm-7 px-4 py-3">
                                <h3>Rodolfo Martinez</h3>
                                <p className="text-muted">San Francisco, USA <i className="fas fa-map-marker-alt"></i></p>
                                <p><i className="fas fa-envelope"></i> email@example.com</p>
                                <p><i className="fas fa-phone-square"></i> (xxx) xxx-xxxx</p>
                                <p className="m-0"><strong>Skills:</strong></p>
                                <p>
                                    <Link to="#" className="badge badge-info">Skill 1</Link>
                                    <Link to="#" className="badge badge-info">Skill 2</Link>
                                    <Link to="#" className="badge badge-info">Skill 3</Link>
                                    <Link to="#" className="badge badge-dark">Skill 4</Link>
                                    <Link to="#" className="badge badge-success">Html</Link>
                                    <Link to="#" className="badge badge-primary">Developer</Link>
                                    <Link to="#" className="badge badge-warning">Bootstrap</Link>
                                </p>
                                <div className="col-sm-12 p-0">
                                    <p className="m-0"><strong>Ratings:</strong></p>
                                    <div className="star-rating" data-rating="4.5">
                                        <span className="far fa-star" data-rating="1"></span>
                                        <span className="far fa-star" data-rating="2"></span>
                                        <span className="far fa-star" data-rating="3"></span>
                                        <span className="far fa-star" data-rating="4"></span>
                                        <span className="far fa-star" data-rating="5"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
