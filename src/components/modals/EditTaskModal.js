import React from 'react';
import closeImage from '../../assets/close.svg'
import AddTaskForm from './form/AddTaskForm';
import axios from 'axios';
import apiUrlTask from '../../apiConfig';

const EditTaskModal = ({ task, isOpen, handleModal, onTaskUpdate, handleToastModal }) => {

    const handleEditTask = async (editedTask) => {
        try {
            await axios.put(apiUrlTask + task.id, editedTask);
            onTaskUpdate();
            handleModal();
            handleToastModal('La tâche a été éditée.');
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
                            <AddTaskForm task={task} onAddTask={handleEditTask} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditTaskModal;