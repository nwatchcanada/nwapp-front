// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";


export default class ItemCreateStep4ResourceLinkComponent extends Component {
    render() {
        const {
            name, externalUrl, description, errors,
            onTextChange, onSelectChange, isLoading, onClick,
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Resource Item</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/item/add/step-2-resource">
                                <span className="num">2.</span><span className="">Categorize</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/admin/item/add/step-3-resource">
                                <span className="num">3.</span><span className="">Format</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Details</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <LinkFormComponent
                                name={name}
                                externalUrl={externalUrl}
                                description={description}
                                errors={errors}
                                onTextChange={onTextChange}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/admin/item/add/step-3-resource" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}


class LinkFormComponent extends Component {
    render() {
        const { name, externalUrl, description, errors, onTextChange } = this.props;
        return (
            <div>
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.name}
                    label="Name (*)"
                    onChange={onTextChange}
                    value={name}
                    name="name"
                    type="text"
                />
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.externalUrl}
                    label="External URL (*)"
                    onChange={onTextChange}
                    value={externalUrl}
                    name="externalUrl"
                    type="text"
                />
                <BootstrapTextarea
                    name="description"
                    borderColour="border-primary"
                    label="Description (*)"
                    placeholder="Please set the link description"
                    rows="5"
                    value={description}
                    helpText="This is the description of the link."
                    onChange={onTextChange}
                    error={errors.description}
                />
            </div>
        );
    };
}
