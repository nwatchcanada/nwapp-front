import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class ConcernItemFilterComponent extends Component {
    render() {
        const { filter, onFilterClick } = this.props;

        const isActive = filter === "active";
        const isInactive = filter === "inactive";

        return(
            <div className="row">
                <div className="col-md-8">
                    <div className="step-navigation float-right">
                        {isActive
                            ?<div id="step-2" className="st-grey active">
                                <strong>
                                    <i className="fas fa-check"></i>&nbsp;<span className="">Active (4)</span>
                                </strong>
                            </div>
                            :<div id="step-2" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "active") } }>
                                    <i className="fas fa-check"></i>&nbsp;<span className="">Active (4)</span>
                                </Link>
                            </div>
                        }
                        {isInactive
                            ?<div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-times"></i>&nbsp;<span className="">Inactive (0)</span>
                                </strong>
                            </div>
                            :<div id="step-1" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "inactive") } }>
                                    <i className="fas fa-times"></i>&nbsp;<span className="">Inactive (0)</span>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
