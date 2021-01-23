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

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BADGE_TYPE_OF_CHOICES } from "../../../../../constants/api";


export default class AdminStaffBadgeAddComponent extends Component {
    render() {
        const {
            typeOf, typeOfOther, onSelectChange, descriptionOther, icon, colour, tags, tagOptions, isTagSetsLoading, file, isArchived,
            flashMessage, isLoading, slug, staff, onTextChange, onMultiChange, errors, onSubmitClick
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
                            <Link to="/admin/staff"><i className="fas fa-user-check"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/staff/${slug}/operations`}>
                                <i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-id-card"></i>&nbsp;Badges
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

                <div className="row" id="mainNav">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/staff/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/staff/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-3" className="st-grey">
                            <Link to={`/staff/${slug}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-4" className="st-grey">
                            <Link to={`/admin/staff/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/staff/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Add Badge</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Type of (*)"
                                name="typeOf"
                                defaultOptionLabel="Please select how you heard about us."
                                options={BADGE_TYPE_OF_CHOICES}
                                value={typeOf}
                                error={errors.typeOf}
                                onSelectChange={onSelectChange}
                            />

                            {typeOf === 1 &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.typeOfOther}
                                    label="Type of (Other) (*)"
                                    onChange={onTextChange}
                                    value={typeOfOther}
                                    helpText="Please specify the title of this badge to display to the user."
                                    name="typeOfOther"
                                    type="text"
                                />
                            }

                            {typeOf === 1 &&
                                <BootstrapTextarea
                                    name="descriptionOther"
                                    borderColour="border-primary"
                                    label="Description (Other) (*)"
                                    placeholder="Please write custom description for this badge."
                                    rows="5"
                                    value={descriptionOther}
                                    helpText="Max length of 255 characters."
                                    onChange={onTextChange}
                                    error={errors.descriptionOther}
                                />
                            }

                            {typeOf === 1 &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.icon}
                                    label="Icon (*)"
                                    onChange={onTextChange}
                                    value={icon}
                                    helpText="Please select the custom icon."
                                    name="icon"
                                    type="text"
                                />
                            }

                            {typeOf === 1 &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.colour}
                                    label="Colour (*)"
                                    onChange={onTextChange}
                                    value={colour}
                                    helpText="Please select the custom colour."
                                    name="colour"
                                    type="text"
                                />
                            }

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onMultiChange}
                                isLoading={isTagSetsLoading}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onSubmitClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/staff/${slug}/community/badges`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}
