import React from 'react';
import closeImage from '../../assets/close.svg';
import axios from 'axios';
import apiUrlTask from '../../apiConfig';
import './DeleteTaskModal.css';

const DeleteTaskModal = ({ task, isOpen, handleModal, onTaskUpdate, handleToastModal }) => {

    const handleDeleteTask = async () => {
        try {
            await axios.delete(apiUrlTask + task.id);
            onTaskUpdate();
            handleModal();
            handleToastModal('La tâche a été supprimée.');
        } catch (error) {
            console.error(error);
            handleToastModal('Une erreur est survenue.', 'red');
        }
    }

    return (
        <>
            {isOpen && (
                <div className='modal-overlay' onClick={handleModal}>
                    <div className='modal-container' onClick={e => e.stopPropagation()}>
                        <div className='modal-header'>
                            <img
                                className='close-image'
                                src={closeImage}
                                alt='Icone croix'
                                onClick={handleModal}
                            />
                        </div>
                        <div className='modal-content'>
                            <p>Voulez-vous supprimer :
                                <span className='task-title'>{task.title}</span>
                                <span className='task-desc'>{task.description}</span>
                            </p>
                            <div className='delete-options'>
                                <div onClick={handleModal}>
                                    <span>Annuler</span>
                                </div>
                                <div onClick={handleDeleteTask}>
                                    <span>Supprimer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteTaskModal;