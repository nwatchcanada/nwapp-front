import React from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';


/**
 * Primitive bootstrap image upload (single) GUI and preview.
 */
export const BootstrapSingleImageUploadAndPreview = ({
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

    const thumb = {
        display: 'inline-flex',
        // borderRadius: 2,
        // border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    return (
        <div className={classnames(divClassName, { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <Dropzone
                onDrop={onDrop}
                accept="image/*"
                minSize={0}
                maxSize={maxSize}
            >
              {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                return (
                  <div className="new-upload-ui" {...getRootProps()}>
                    <input {...getInputProps()} />
					<i className="fas fa-cloud-upload-alt fa-4x"></i>
					<small className="text-secondary d-block">
						{!isDragActive && 'Click here or drop a file to upload!'}
						{isDragActive && !isDragReject && "Drop it like it's hot!"}
						{isDragReject && "File type not accepted, sorry!"}
						{isFileTooLarge && (
							<div className="text-danger mt-2">
								{process.env.REACT_APP_IMAGE_UPLOAD_MAX_FILESIZE_ERROR_MESSAGE}
							</div>
						)}
					</small>
                  </div>
                )}
              }
            </Dropzone>

            { /* The follwoing code will render our stylized preview image. */ }

            { /* Local Version */ }
            {fileObj && fileObj.preview &&
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

            { /* Remote Version */ }
            {fileObj && fileObj.fileUrl &&
                <div>
                    <div style={thumb}>
                        <img
                            src={fileObj.fileUrl}
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

            { /* The following code will render the file name. */ }
            { /*
            <ul className="list-group mt-2">
                {fileObj &&
                    <li className="list-group-item list-group-item-success">
                        {fileObj.name}
                    </li>
                }
            </ul>
            */ }

        </div>
    );
}

/**
 *  Special thanks:
 *  https://upmostly.com/tutorials/react-dropzone-file-uploads-react/
 *  https://react-dropzone.netlify.com/#previews
 */
