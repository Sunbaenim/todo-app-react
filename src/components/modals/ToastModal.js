import React from 'react';
import './ToastModal.css';

const ToastModal = ({ isOpen, message, color }) => {

    return (
        <>
            {isOpen && (
                <div className='toast-modal' style={{backgroundColor: color === 'green' ? '#28a745' : '#dc3545'}}>
                    <p>{message}</p>
                </div>
            )}
        </>
    );
}

export default ToastModal;