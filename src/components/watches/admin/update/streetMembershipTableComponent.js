import React, { Component } from 'react';


export default class StreetMembershipTableComponent extends Component {
    render() {
        const {
            streetMembership, onAddClick, onEditClick, onRemoveClick
        } = this.props;

        let elements = [];
        if (streetMembership !== undefined && streetMembership !== null) {
            for (let i = 0; i < streetMembership.length; i++) {
                let rowData = streetMembership[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <StreetMembershipRow
                            key={rowData.streetAddress}
                            streetAddress={rowData.streetAddress}
                            streetNumberStart={rowData.streetNumberStart}
                            streetNumberEnd={rowData.streetNumberEnd}
                            streetName={rowData.streetName}
                            streetType={rowData.streetType}
                            streetTypeLabel={rowData.streetTypeLabel}
                            streetDirection={rowData.streetDirection}
                            streetDirectionLabel={rowData.streetDirectionLabel}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                        />
                    );
                }
            }
        }

        return (
            <div>

                <div className="row">
                    <div className="col-md-12 mx-auto mt-2">
                        <button type="button" className="btn btn-success float-right" onClick={onAddClick}>
                            <span className="fa fa-plus">&nbsp;Add Address Info</span>
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Street # (Start)</th>
                                <th>Street # (End)</th>
                                <th>Street Name</th>
                                <th>Street Type</th>
                                <th>Direction</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class StreetMembershipRow extends Component {
    render() {
        const {
            streetAddress,
            streetNumberStart,
            streetNumberEnd,
            streetName,
            streetType,
            streetTypeLabel,
            streetDirection,
            streetDirectionLabel,
            onEditClick,
            onRemoveClick
        } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumberStart}
                </td>
                <td>
                    {streetNumberEnd}
                </td>
                <td>
                    {streetName}
                </td>
                <td id={`street-type-${streetType}`}>
                    {streetTypeLabel}
                </td>
                <td id={`street-direction-${streetDirection}`}>
                    {streetDirectionLabel}
                </td>
                <td>
                    <button type="button" className="btn btn-warning float-left" aria-label="prev" onClick={() => onEditClick(streetAddress)}>
                        <span className="fa fa-edit"></span>
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger float-right" aria-label="prev" onClick={() => onRemoveClick(streetAddress)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </td>
            </tr>
        );
    }
}
