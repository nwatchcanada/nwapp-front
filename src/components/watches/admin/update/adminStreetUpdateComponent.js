// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import AddModalComponent from "./addModalComponent";
import EditModalComponent from "./editModalComponent";
import StreetMembershipTableComponent from "./streetMembershipTableComponent";


export default class AdminWatchStreetUpdateComponent extends Component {
    render() {
        const {
            watchDetail, slug, errors, isLoading, onClick, onTextChange,
            onSelectChange, onMultiChange, streetMembership,

            // Modal related.
            streetNumberStart,
            streetNumberEnd,
            streetNumberRangeType,
            streetNumberRangeTypeOptions,
            streetName, streetType,
            streetTypeOptions,
            streetTypeOther,
            streetDirection,
            streetDirectionOptions,
            showAddModal, onAddClick,
            showEditModal,
            onRemoveClick, onEditClick, onSaveAddClick, onSaveEditClick, onModalCloseClick
        } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watches`}><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watch/${slug}`}><i className="fas fa-user"></i>&nbsp;{watchDetail && watchDetail.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update Watch
                        </li>
                    </ol>
                </nav>

                <h1>Update Watch - Details</h1>

                <div className="col-md-10 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center"><i className="fas fa-road"></i>&nbsp;Street Membership</h3>
                    <form id="residential-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <AddModalComponent
                                streetNumberStart={streetNumberStart}
                                streetNumberEnd={streetNumberEnd}
                                streetName={streetName}
                                streetType={streetType}
                                streetTypeOptions={streetTypeOptions}
                                streetTypeOther={streetTypeOther}
                                streetDirection={streetDirection}
                                streetDirectionOptions={streetDirectionOptions}
                                onTextChange={onTextChange}
                                onSelectChange={onSelectChange}
                                errors={errors}
                                showAddModal={showAddModal}
                                onSaveClick={onSaveAddClick}
                                onCloseClick={onModalCloseClick}
                            />

                            <EditModalComponent
                                streetNumberStart={streetNumberStart}
                                streetNumberEnd={streetNumberEnd}
                                streetNumberRangeType={streetNumberRangeType}
                                streetNumberRangeTypeOptions={streetNumberRangeTypeOptions}
                                streetName={streetName}
                                streetType={streetType}
                                streetTypeOptions={streetTypeOptions}
                                streetTypeOther={streetTypeOther}
                                streetDirection={streetDirection}
                                streetDirectionOptions={streetDirectionOptions}
                                onTextChange={onTextChange}
                                onSelectChange={onSelectChange}
                                errors={errors}
                                showEditModal={showEditModal}
                                onSaveClick={onSaveEditClick}
                                onCloseClick={onModalCloseClick}
                            />

                            <StreetMembershipTableComponent
                               streetMembership={streetMembership}
                               onAddClick={onAddClick}
                               onEditClick={onEditClick}
                               onRemoveClick={onRemoveClick}
                            />

                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                            <Link to={`/admin/watch/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </form>
                </div>

            </main>
        );
    }
}
