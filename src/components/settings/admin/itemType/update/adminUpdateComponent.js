// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";


class AdminItemTypeUpdateComponent extends Component {
    render() {
        const {
            slug, category, categoryOptions, text, description, errors, isLoading,
            onTextChange, onSelectChange, onClick
        } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/item-types"><i className="fas fa-sliders-h"></i>&nbsp;Item Types</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/settings/item-type/${slug}`}>
                                <i className="fas fa-itemType"></i>&nbsp;{text}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update Item Type</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Category (*)"
                                name="category"
                                defaultOptionLabel="Please select the event type."
                                options={categoryOptions}
                                value={category}
                                error={errors.category}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.text}
                                label="Text (*)"
                                onChange={onTextChange}
                                value={text}
                                name="text"
                                type="text"
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please set the itemType description"
                                rows="5"
                                value={description}
                                helpText="This is the description of the residential itemType."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/settings/item-type/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminItemTypeUpdateComponent;
