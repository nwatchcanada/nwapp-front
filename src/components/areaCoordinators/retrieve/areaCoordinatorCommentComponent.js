import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";


export default class AreaCoordinatorCommentComponent extends Component {
    render() {
        const {
            areaCoordinatorComments, flashMessage, isLoading, slug, areaCoordinator, text, onTextChange, errors, onClick
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/area-coordinators"><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-horse-head"></i>&nbsp;{areaCoordinator && areaCoordinator.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{areaCoordinator && areaCoordinator.fullName}</h1>

                {areaCoordinator.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This areaCoordinator is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/area-coordinator/${slug}/comments`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/area-coordinator/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row align-items-start">
                    <h1>Comments/Notes</h1>
                    <div className="col-lg-12">
                        {areaCoordinatorComments && areaCoordinatorComments.map(
                            (comment) => <CommentComponent comment={comment} id={comment.id} />
                        )}
                        <hr className="my-4" />
                        <form>
                            <BootstrapErrorsProcessingAlert errors={errors} />
                            <BootstrapTextarea
                                name="text"
                                borderColour="border-success"
                                label="Additional Comments"
                                placeholder="Write any additional text here."
                                rows="5"
                                value={text}
                                helpText="This is the comment of the organization."
                                onChange={onTextChange}
                                error={errors.text}
                            />
                            <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}


class CommentComponent extends Component {
    render() {
        const { comment } = this.props;
        return (
            <div className="media mt-4">
                <img className="mr-3 img-head" src="/img/placeholder.png" alt="" />
                <div className="media-body">
                    <div className="row">
                        <h5 className="mt-0 col-sm-10"><strong>{comment.createdBy}</strong></h5>
                        <h6 className="col-sm-2 text-secondary text-right">
                            <Moment format="MM/DD/YYYY hh:mm:ss a">{comment.createdAt}</Moment>
                        </h6>
                    </div>
                    <p>{ comment.text }</p>
                </div>
            </div>
        );
    }
}
