import React from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';
import DOMPurify from "dompurify";


export const BootstrapDateTimePicker = ({
    dateCaption,
    timeCaption,
    name,
    datePickerClassName,
    divClassName,
    borderClassname="border-primary",
    onTimeChange,
    dateObj,
    error,
    helpText,
    maxDate=null,
    minDate=null,
    disabled=false,
    placeholderText=null
}) => {
    // DEVELOPERS NOTE:
    // List of props can be found:
    // https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
    return (
        <div className={divClassName}>
            <label className="font-weight-bold" htmlFor={name}>{dateCaption}</label>
            <div className="input-group input-group-lg date-picker-group">
                <DatePicker
                    name={name}
                    selected={dateObj}
                    onChange={onTimeChange}
                    className={classnames(datePickerClassName, { 'border-danger has-error': error }, { 'border-success': !error && borderClassname === 'border-success' }, { 'border-primary': !error && borderClassname === 'border-primary' } )}
                    maxDate={maxDate}
                    minDate={minDate}
                    disabled={disabled}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption={timeCaption}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText={placeholderText}
                />
                <div className="input-group-append">
                    <span className={classnames('input-group-text dob-icon', { 'bg-danger border-danger': error }, { 'bg-success border-success': !error && borderClassname === 'border-success' }, { 'bg-primary border-primary': !error && borderClassname === 'border-primary' } )}>
                        <i className="far fa-calendar"></i>
                    </span>
                </div>
            </div>
            <small className="form-text text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(helpText) }}></small>
        </div>
    );
}
