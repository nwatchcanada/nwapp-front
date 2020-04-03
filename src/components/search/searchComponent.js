// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapMultipleSelect } from "../bootstrap/bootstrapMultipleSelect";


class AdminSearchComponent extends Component {
    render() {
        const {
            keyword, errors, isLoading, onClick,
            tags, tagOptions, onTagMultiChange, isTagsLoading, onTextChange,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-search"></i>&nbsp;Search
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-search"></i>&nbsp;Search
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-search"></i>&nbsp;Search
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.keyword}
                                label="Keyword"
                                onChange={onTextChange}
                                value={keyword}
                                name="keyword"
                                type="text"
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tags."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onTagMultiChange}
                                isLoading={isTagsLoading}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-search"></i>&nbsp;Search
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default AdminSearchComponent;
