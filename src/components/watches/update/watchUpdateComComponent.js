// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


class WatchUpdateComComponent extends Component {
    render() {
        const {
            slug, name, description, associate, associateOptions, district, districtOptions,
            primaryAreaCoordinator, primaryAreaCoordinatorOptions, secondaryAreaCoordinator, secondaryAreaCoordinatorOptions,
            errors, isLoading, onClick, onTextChange, onSelectChange,
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/watches"><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/watch-cc/${slug}`}><i className="fas fa-university"></i>&nbsp;{name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Update
                </h1>

                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center">Details</h3>
                    <form id="business-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please set the watch description"
                                rows="5"
                                value={description}
                                helpText="This is the description of the watch."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapSingleSelect
                                label="Associate (*)"
                                name="associate"
                                defaultOptionLabel="Please select the associate."
                                options={associateOptions}
                                value={associate}
                                error={errors.associate}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="District (*)"
                                name="district"
                                defaultOptionLabel="Please select the residential district."
                                options={districtOptions}
                                value={district}
                                error={errors.district}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Primary Area Coordinator (*)"
                                name="primaryAreaCoordinator"
                                defaultOptionLabel="Please select the primary area coordinator."
                                options={primaryAreaCoordinatorOptions}
                                value={primaryAreaCoordinator}
                                error={errors.primaryAreaCoordinator}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Secondary Area Coordinator (*)"
                                name="secondaryAreaCoordinator"
                                defaultOptionLabel="Please select the secondary area coordinator."
                                options={secondaryAreaCoordinatorOptions}
                                value={secondaryAreaCoordinator}
                                error={errors.secondaryAreaCoordinator}
                                onSelectChange={onSelectChange}
                            />
                        </div>
                    </form>

                    <div className="form-group">
                        <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                            <i className="fas fa-check"></i>&nbsp;Submit
                        </button>
                        <Link to={`/watch-cc/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                            <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                        </Link>
                    </div>

                </div>

            </main>
        );
    }
}

export default WatchUpdateComComponent;
