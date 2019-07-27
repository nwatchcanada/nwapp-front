import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class FinancialFilterComponent extends Component {
    render() {
        const { filter, onFilterClick } = this.props;

        const isUnpaid = filter === "unpaid";
        const isPaid = filter === "paid";
        const isAll = filter === "all";

        return(
            <div className="row">
                <div className="col-md-8">
                    <div className="step-navigation float-right">
                        {isUnpaid
                            ?<div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-clock"></i>&nbsp;<span className="">Unpaid (3)</span>
                                </strong>
                            </div>
                            :<div id="step-1" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "unpaid") } }>
                                    <i className="fas fa-clock"></i>&nbsp;<span className="">Unpaid (3)</span>
                                </Link>
                            </div>
                        }
                        {isPaid
                            ?<div id="step-2" className="st-grey active">
                                <strong>
                                    <i className="fas fa-check"></i>&nbsp;<span className="">Paid (0)</span>
                                </strong>
                            </div>
                            :<div id="step-2" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "paid") } }>
                                    <i className="fas fa-check"></i>&nbsp;<span className="">Paid (0)</span>
                                </Link>
                            </div>
                        }
                        {isAll
                            ?<div id="step-3" className="st-grey active">
                                <strong>
                                    <i className="fas fa-list"></i>&nbsp;<span className="">All (0)</span>
                                </strong>
                            </div>
                            :<div id="step-3" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "all") } }>
                                    <i className="fas fa-list"></i>&nbsp;<span className="">All (0)</span>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
