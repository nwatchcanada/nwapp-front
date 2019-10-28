import PropTypes from 'prop-types';
import React from 'react';
import shortid from "shortid";
import { Link } from "react-router-dom";
import { ScaleLoader } from 'react-spinners';
import ReactModal from 'react-modal';


/**
 *  Component used to generate a modal on the screen, with the rest of the
 *  screen faded, telling the user that the page is loading with page loading
 *  animation.
 */
export const BootstrapPageLoadingAnimation = ({ isLoading }) => {
    const id = shortid.generate();

    // Apply our styling for our modal component.
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    return (
        <div>
            {isLoading &&
                <ReactModal
                   isOpen={true}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={null}>
                    <div className="row" id={id}>
                        <div className="col-sm-6 mx-auto p-4 error-page">

                          <div className="loader">
                            <ScaleLoader
                              heightUnit={"px"}
                              widthUnit={"px"}
                              height={35}
                              width={40}
                              radius={2}
                              margin={'2px'}
                              color={'#6c757d'}
                            />
                            <h2 className="text-center text-secondary mb-3 loader-text" dangerouslySetInnerHTML={{ __html: '' }} />
                          </div>
                          <p className="text-center text-secondary lead mb-4">
                            We are currently loading up your list. Please wait.
                            If you are having trouble loading the page, please refresh the page.
                            For immediate help, contact
                            <Link to="/help">&nbsp;support.</Link>
                          </p>
                        </div>
                    </div>
                </ReactModal>
            }
        </div>
    )
}
