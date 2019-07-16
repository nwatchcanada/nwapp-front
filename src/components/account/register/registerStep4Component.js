// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';


export default class RegisterStep4Component extends Component {
    render() {
        const { returnURL, tableData, isLoading, onTableRowClick, onShowModalClick, onCloseModalClick, showModal, onAgreeModalClick } = this.props;

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
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Register
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/register/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={returnURL}>
                                <span className="num">2.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/register/step-3">
                                <span className="num">3.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Watch</span>
                            </strong>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Legality</span>
                        </div>
                        <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Review</span>
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

                                   <p>NWL Staff will check your details, and will place you in the appropriate ward and watch. Please keep an eye on your email inbox.</p>

                                   <button
                                       onClick={onCloseModalClick}
                                       type="button"
                                       className="btn btn-lg btn-secondary float-left">
                                       <i className="fas fa-times"></i>&nbsp;Close
                                   </button>
                                   <button
                                       onClick={onAgreeModalClick}
                                       type="button"
                                       className="btn btn-lg btn-success float-right">
                                       I understand and procced to metrics&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                   </button>
                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-shield-alt"></i>&nbsp;Watch
                            </h2>
                            <p>According to the address you entered, you are eligable for the following watches, please select the watch which is appropriate for the member:</p>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tableData && tableData.map(
                                            (tableDatum, i) => <TableRow datum={tableDatum} key={i} onTableRowClick={onTableRowClick} isLoading={isLoading} />)
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-warning btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onShowModalClick}>
                                    I don't know and proceed to metrics&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/register/step-3" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

class TableRow extends Component {
    render() {
        const { slug, icon, name } = this.props.datum;
        const { onTableRowClick, isLoading } = this.props;

        return (
            <tr slug={slug}>
                <td><i className={`fas fa-${icon}`}></i></td>
                <td>{name}</td>
                <td>

                    <button className="btn btn-primary btn-sm float-right" disabled={isLoading} onClick={ (event) => { onTableRowClick(event, slug, icon, name) } }>
                        Select and proceed to metrics&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </button>
                </td>
            </tr>
        );
    }
}
