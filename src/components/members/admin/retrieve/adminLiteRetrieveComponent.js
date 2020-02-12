import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminMemberLiteRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, member, isLoading } = this.props;
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

                {member.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This member is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/member/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
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

                <div className="row mt-0 pt-3 mb-4 pb-2">
                    <div className="col-md-9 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-4">
                                <Link to={`/admin/member/${slug}/avatar`}>
                                    {member && member.avatarUrl !== undefined && member.avatarUrl !== null
                                        ? <img src={member.avatarUrl} className="img-fluid rounded" alt="Profile" id={`member-avatar-${slug}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>

                            <div className="col-sm-8 px-4 py-3">
                                {member && member.organizationName &&
                                    <h1>{member.organizationName}</h1>
                                }
                                <h3>
                                    {member && member.fullName}
                                </h3>

                                {member && member.address &&
                                    <p className="text-muted">
                                        <a href={member.googleMapsUrl} target="_blank">{member.address}&nbsp;<i className="fas fa-map-marker-alt"></i></a>
                                    </p>
                                }

                                {member && member.email &&
                                    <p>
                                        <a href={`mailto:${member.email}`}><i className="fas fa-envelope"></i>&nbsp;{member.email}</a>
                                    </p>
                                }

                                {member && member.primaryPhoneNational &&
                                    <p>
                                        <a href={`tel:${member.primaryPhoneE164}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{member.primaryPhoneNational}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {member &&
                                    <p>
                                        {member.tags && member.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                                {member && member.badges && member.badges.length > 0 &&
                                    <div>
                                        <p className="m-0"><strong>Badges:</strong></p>
                                        <p>
                                            {member.badges && member.badges.map(
                                                (badge) => <BadgeItem badge={badge} key={badge.uuid} />)
                                            }
                                        </p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    {/*
					<div className="col-sm-12 mx-auto text-center mt-4">
						{member.state === 'inactive'
                            ? <button className="btn btn-orange btn-lg">
                                <i className="fas fa-lock"></i>&nbsp;Add Job
                              </button>
                            : <Link className="btn btn-success btn-lg" onClick={onClientClick}>
                                <i className="fas fa-plus"></i>&nbsp;Add Job
                              </Link>
                        }
					</div>
                    */}
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
