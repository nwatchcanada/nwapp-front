import React from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';


/**
 * Primitive bootstrap image upload (single) GUI and preview.
 */
export const BootstrapSingleFileUploadAndPreview = ({
    label,
    name,
    onDrop,
    error,
    divClassName = "form-group",
    borderColour = '',
    inputClassName = "form-group",
    fileObj = null,
    onRemoveUploadClick = null
}) => {
    const maxSize = parseInt(process.env.REACT_APP_IMAGE_UPLOAD_MAX_FILESIZE_IN_BYTES);

    console.log("fileObj:", fileObj);

    return (
        <div className={classnames(divClassName, { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <Dropzone
                onDrop={onDrop}
                minSize={0}
                maxSize={maxSize}
            >
              {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                    {isFileTooLarge && (
                      <div className="text-danger mt-2">
                        {process.env.REACT_APP_IMAGE_UPLOAD_MAX_FILESIZE_ERROR_MESSAGE}
                      </div>
                    )}
                  </div>
                )}
              }
            </Dropzone>

            { /* The follwoing code will render our stylized preview image. */ }
            { /*
            {fileObj &&
                <div>
                    <div style={thumb}>
                        <img
                            src={fileObj.preview}
                            style={img}
                            alt={label}
                        />
                    </div>
                    <br />
                    <button className="btn btn-danger btn-sm float-left" onClick={onRemoveUploadClick}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Remove Upload
                    </button>
                    <br />
                </div>
            }
            */ }

            { /* The following code will render the file name. */ }
            {fileObj &&
                <ul className="list-group mt-2">
                    {fileObj &&
                        <li className="list-group-item list-group-item-success">
                            {fileObj.name}
                            <button className="btn btn-danger btn-sm float-left" onClick={onRemoveUploadClick}>
                                <i className="fas fa-trash-alt"></i>&nbsp;Remove Upload
                            </button>
                            <br />
                        </li>
                    }
                </ul>
            }


        </div>
    );
}

/**
 *  Special thanks:
 *  https://upmostly.com/tutorials/react-dropzone-file-uploads-react/
 *  https://react-dropzone.netlify.com/#previews
 */
