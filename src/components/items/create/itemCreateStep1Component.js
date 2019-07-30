// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemCreateStep1Component extends Component {
    render() {
        const { onClick, onShowModalClick, onCloseModalClick, showModal, onAgreeModalClick } = this.props;

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
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Type</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Details</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="card-group row">
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-fire fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Incident</h3>
                                <p className="card-text">Add a residential district</p>
                                <button className="btn btn-success btn-lg" onClick={onShowModalClick}>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-glass-cheers fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Event</h3>
                                <p className="card-text">Add a business district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, EVENT_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-exclamation-circle fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Concern</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, CONCERN_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-info-circle fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Information</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, INFORMATION_ITEM_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">

                    <Link to="/items" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-exclamation-triangle"></i>&nbsp;Are you in danger?
                           <button type="button" className="btn btn-secondary btn-lg float-right" onClick={onCloseModalClick}>
                               <span className="fa fa-times"></span>
                           </button>
                        </h1>

                        <div className="row">
                            <div className="col-md-8 mx-auto mt-2">

                                <form className="needs-validation" noValidate>

                                   <p>If you are someone else is in immediate danger, CALL 911 NOW. Do not fill out this report, instead, contact emergency services. Otherwise, proceed with the report details.</p>

                                   <a href="tel:5196614553"
                                      ype="button"
                                      className="btn btn-lg btn-danger float-left">
                                       <i className="fas fa-phone"></i>&nbsp;<strong>Dial 911</strong>
                                   </a>
                                   <button
                                       onClick={ (event)=>{ onClick(event, INCIDENT_ITEM_TYPE_OF); } }
                                       type="button"
                                       className="btn btn-lg btn-primary float-right">
                                       Proceed to filing an incident report&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                   </button>
                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

            </main>
        );
    }
}

export default ItemCreateStep1Component;
