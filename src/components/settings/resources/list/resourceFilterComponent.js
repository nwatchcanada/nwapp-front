import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class ResourceFilterComponent extends Component {
    render() {
        const { filter, onFilterClick } = this.props;

        const isActive = filter === "active";
        const isInactive = filter === "archived";

        return(
            <div className="row">
                <div className="col-md-8">
                    <div className="step-navigation float-right">
                        {isActive
                            ?<div id="step-2" className="st-grey active">
                                <strong>
                                    <i className="fas fa-check-circle"></i>&nbsp;<span className="">Active (3)</span>
                                </strong>
                            </div>
                            :<div id="step-2" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "active") } }>
                                    <i className="fas fa-check-circle"></i>&nbsp;<span className="">Active (3)</span>
                                </Link>
                            </div>
                        }
                        {isInactive
                            ?<div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-archive"></i>&nbsp;<span className="">Archived (0)</span>
                                </strong>
                            </div>
                            :<div id="step-1" className="st-grey">
                                <Link onClick={ (event)=>{ onFilterClick(event, "archived") } }>
                                    <i className="fas fa-archive"></i>&nbsp;<span className="">Archived (0)</span>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
