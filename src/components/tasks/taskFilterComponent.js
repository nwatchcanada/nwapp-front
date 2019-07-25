import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class TaskFilterComponent extends Component {
    render() {
        const { filter, onFilterClick } = this.props;

        const isPending = filter === "pending";
        const isUnassigned = filter === "unassigned";
        const isClosed = filter === "closed";

        return(
            <div className="row">
                <div className="col-md-9">
                    <div className="step-navigation float-right">
                        {isUnassigned
                            ?<div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-question-circle"></i>&nbsp;<span className="">Unassigned (1)</span>
                                </strong>
                            </div>
                            :<div id="step-1" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "unassigned") } }>
                                    <i className="fas fa-question-circle"></i>&nbsp;<span className="">Unassigned (3)</span>
                                </Link>
                            </div>
                        }
                        {isPending
                            ?<div id="step-2" className="st-grey active">
                                <strong>
                                    <i className="fas fa-clock"></i>&nbsp;<span className="">Pending (0)</span>
                                </strong>
                            </div>
                            :<div id="step-2" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "pending") } }>
                                    <i className="fas fa-clock"></i>&nbsp;<span className="">Pending (0)</span>
                                </Link>
                            </div>
                        }
                        {isClosed
                            ?<div id="step-3" className="st-grey active">
                                <strong>
                                    <i className="fas fa-check-circle"></i>&nbsp;<span className="">Closed (0)</span>
                                </strong>
                            </div>
                            :<div id="step-3" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "closed") } }>
                                    <i className="fas fa-check-circle"></i>&nbsp;<span className="">Closed (0)</span>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
