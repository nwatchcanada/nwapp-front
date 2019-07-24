import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { FlashMessageComponent } from "../flashMessageComponent";



// It's a data format example.
function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

function buttonFormatter(cell, row){
    return (
        <a href="">
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </a>
    )
  // return '<BootstrapButton type="submit"></BootstrapButton>';
}

class TaskUnassignedListComponent extends Component {
    render() {
        const { selectedColumnKey, selectedColumnOrder, onTableColumnClick, tableData, flashMessage } = this.props;




var products = [{
      id: 1,
      name: "Product1",
      price: 120,
  }, {
      id: 2,
      name: "Product2",
      price: 80,
  }];

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tasks"></i>&nbsp;Tasks
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/tasks/pending/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search your tasks</span>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9">

                        <div className="step-navigation float-right">
                            <div id="step-1" className="st-grey active">
                                <strong>
                                    <i className="fas fa-question-circle"></i>&nbsp;<span className="">Unassigned (1)</span>
                                </strong>
                            </div>
                            <div id="step-2" className="st-grey">
                                <Link to="/tasks/pending">
                                    <i className="fas fa-clock"></i>&nbsp;<span className="">Pending (3)</span>
                                </Link>
                            </div>
                            <div id="step-3" className="st-grey">
                                <Link to="/tasks/closed">
                                    <i className="fas fa-check-circle"></i>&nbsp;<span className="">Closed (3)</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-clock"></i>&nbsp;Unassigned List
                        </h2>
                        <BootstrapTable data={products} striped={true} hover={true} bordered={false}>
                            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
      <TableHeaderColumn dataField="button" dataFormat={buttonFormatter}>Buttons</TableHeaderColumn>
  </BootstrapTable>,

                    </div>
                </div>
            </div>
        );
    }
}

export default TaskUnassignedListComponent;
