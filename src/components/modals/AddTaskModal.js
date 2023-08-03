import React from 'react';
import './AddTaskModal.css';
import closeImage from '../../assets/close.svg';
import AddTaskForm from './form/AddTaskForm';
import axios from 'axios';
import apiUrlTask from '../../apiConfig';

const AddTaskModal = ({ isOpen, handleModal, onTaskUpdate, handleToastModal }) => {

    const handleAddTask = async (newTask) => {
        try {
            await axios.post(apiUrlTask, newTask);
            onTaskUpdate();
            handleModal();
            handleToastModal('La tâche a été ajoutée.');
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
                            <AddTaskForm onAddTask={handleAddTask} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTaskModal;