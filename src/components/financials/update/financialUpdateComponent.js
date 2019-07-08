import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";


export default class FinancialUpdateComponent extends Component {
    render() {
        const {
            slug,
            firstName, errors, isLoading, onTextChange, onSubmitClick
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/financials/all"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${slug}`}><i className="fas fa-credit-card"></i>&nbsp;Details</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Edit
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-edit"></i>&nbsp;Edit Financial Details</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-edit"></i>&nbsp;Form
                            </h2>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.firstName}
                                label="First Name"
                                onChange={onTextChange}
                                value={firstName}
                                name="firstName"
                                type="text"
                            />
                        </form>

                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onSubmitClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Submit
                            </button>
                            <Link to={`/financial/${slug}`}  className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i> Back
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
