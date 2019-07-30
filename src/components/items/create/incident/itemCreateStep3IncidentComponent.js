// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import {
    ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES,
    ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES
} from "../../../../constants/api";


class ItemCreateStep3IncidentComponent extends Component {
    render() {
        const {
            notifiedAuthorities, acceptAuthorityCooperation,
            errors,
            onTextChange,
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
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/item/add/step-2-incident">
                                <span className="num">2.</span><span className="">Categorize</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Authorities</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Details</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Cooperation</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation Required
                           <button type="button" className="btn btn-secondary btn-lg float-right" onClick={onCloseModalClick}>
                               <span className="fa fa-times"></span>
                           </button>
                        </h1>

                        <div className="row">
                            <div className="col-md-8 mx-auto mt-2">

                                <form className="needs-validation" noValidate>

                                   <p>Do you wish to erase and cancel this incident report?</p>

                                   <button
                                       onClick={onCloseModalClick}
                                       type="button"
                                       className="btn btn-lg btn-secondary float-left">
                                       <i className="fas fa-times"></i>&nbsp;No, continue
                                   </button>
                                   <button
                                       onClick={onAgreeModalClick}
                                       type="button"
                                       className="btn btn-lg btn-danger float-right">
                                       Yes, erase&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                   </button>
                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-user-secret"></i>&nbsp;Authorities Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.notifiedAuthorities}
                                label="Have you notified the authorities of this Incident? (*)"
                                name="notifiedAuthorities"
                                onChange={onRadioChange}
                                selectedValue={notifiedAuthorities}
                                options={ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.acceptAuthorityCooperation}
                                label="Please note that Neighbourhood Watch London cooperates with local authorities, and if requested by the police or a court order, a copy of this report will be made available to them. Do you wish to proceed? (*)"
                                name="acceptAuthorityCooperation"
                                onChange={onRadioChange}
                                selectedValue={acceptAuthorityCooperation}
                                options={ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={ (event)=>{onClick(event)} }>
                                    Proceed to Details&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/item/add/step-2-incident" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemCreateStep3IncidentComponent;
