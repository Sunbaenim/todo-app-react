import React, { useState } from 'react';
import editImage from '../../assets/edit.svg';
import deleteImage from '../../assets/delete.svg';
import './SettingsModal.css';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

const SettingsModal = ({ task, isOpen, handleModal, onTaskUpdate, handleToastModal }) => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleShowDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const handleShowEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    return (
        <>
            {isOpen && (
                <>
                    <div className='settings-modal-overlay' onClick={handleModal}></div>
                    <div className='settings-modal'>
                        <img
                            className='edit-image'
                            src={editImage}
                            alt='Icone édition'
                            onClick={handleShowEditModal}
                        />
                        <img
                            className='delete-image'
                            src={deleteImage}
                            alt='Icone suppression'
                            onClick={handleShowDeleteModal}
                        />
                    </div>
                    <EditTaskModal task={task} isOpen={isEditModalOpen} handleModal={handleShowEditModal} onTaskUpdate={onTaskUpdate} handleToastModal={handleToastModal}  />
                    <DeleteTaskModal task={task} isOpen={isDeleteModalOpen} handleModal={handleShowDeleteModal} onTaskUpdate={onTaskUpdate} handleToastModal={handleToastModal} />
                </>
            )}
        </>
    );
}

export default SettingsModal;