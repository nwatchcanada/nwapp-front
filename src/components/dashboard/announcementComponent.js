import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
// import 'moment-timezone';


export default class AnnouncementComponent extends Component {
    render() {
        const { announcementItems } = this.props
        if (announcementItems === null || announcementItems === undefined || isEmpty(announcementItems)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                    <p className="lead">There are no announcements. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'text',
                text: 'Messages',
                sort: false
            },{
                dataField: 'slug',
                text: '',
                sort: false,
                formatter: newsEditLinkFormatter
            },{
                dataField: 'slug',
                text: '',
                sort: false,
                formatter: newsDeleteLinkFormatter
            }];

            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='slug'
                            data={ announcementItems }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent tasks at the moment"
                        />
                        <p class="lead">
                            <Link className="btn btn-success btn-lg px-4" to="/admin/settings/announcement/add/step-1" role="button">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

    }
}

function newsEditLinkFormatter(cell, row){
    return (
        <Link to={`/admin/settings/announcement/${row.slug}`}>
            <i class="fas fa-pencil-alt"></i>
        </Link>
    );
}

function newsDeleteLinkFormatter(cell, row){
    return (
        <Link className="text-danger" to={`/admin/settings/announcement/operation/archive/${row.slug}`}>
            <i class="fas fa-times"></i>
        </Link>
    );
}
