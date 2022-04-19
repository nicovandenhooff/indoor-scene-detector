import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css'

import { useOnClickOutside } from '../../../hooks';


export const Modal = ({ isShowing, toggle }) => {
    const ref = useRef()
    useOnClickOutside(ref, () => toggle(false));

    return (
        <>
            {isShowing ? ReactDOM.createPortal(
                <React.Fragment >
                    <div className="modal-overlay" />
                    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                        <div ref={ref} className="modal">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="modal-close-button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { toggle(false) }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <p>
                                Whoops! Looks like you've forgotten to select or upload a photo.
                            </p>
                        </div>
                    </div>
                </React.Fragment>, document.body
            ) : null
            }
        </>
    )
}