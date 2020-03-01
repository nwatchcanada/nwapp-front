// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import {
    ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES,
    ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES
} from "../../../../constants/api";


class ItemAuthoritiesUpdateComponent extends Component {
    render() {
        const {
            slug,
            hasNotifiedAuthorities,
            hasAcceptAuthorityCooperation,
            errors,
            onRadioChange,
            isLoading,
            onClick,
            onCloseModalClick,  showModal, onAgreeModalClick
        } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/item/${slug}`}><i className="fas fa-map-pin"></i>&nbsp;Details</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Edit
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-edit"></i>&nbsp;Edit Incident Item</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-user-secret"></i>&nbsp;Authorities Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.hasNotifiedAuthorities}
                                label="Have you notified the authorities of this Incident? (*)"
                                name="hasNotifiedAuthorities"
                                onChange={onRadioChange}
                                selectedValue={hasNotifiedAuthorities}
                                options={ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.hasAcceptAuthorityCooperation}
                                label="Please note that Neighbourhood Watch London cooperates with local authorities, and if requested by the police or a court order, a copy of this report will be made available to them. Do you wish to proceed? (*)"
                                name="hasAcceptAuthorityCooperation"
                                onChange={onRadioChange}
                                selectedValue={hasAcceptAuthorityCooperation}
                                options={ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES}
                                disabled={true}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={ (event)=>{onClick(event)} }>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/item/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemAuthoritiesUpdateComponent;
