import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';


export const BootstrapTimePicker = ({ label, name, datePickerClassName, divClassName, borderClassname="border-primary", onTimeChange, dateObj, error }) => {
    return (
        <div className={divClassName}>
            <label htmlFor={name}>{label}</label>
            <div className="input-group input-group-lg date-picker-group">
                <DatePicker
                    name={name}
                    selected={dateObj}
                    onChange={onTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    className={classnames(datePickerClassName, { 'has-error': error }, { 'border-success': !error && borderClassname === 'border-success' }, { 'border-primary': !error && borderClassname === 'border-primary' } )}

                />
                <div className="input-group-append">
                    <span className="input-group-text dob-icon bg-primary border-primary">
                        <i className="far fa-clock"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}
