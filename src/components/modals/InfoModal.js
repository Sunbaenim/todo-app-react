import React from 'react';
import './InfoModal.css';
import closeImage from '../../assets/close.svg';
import { format } from 'date-fns';

const InfoModal = ({ task, isOpen, handleModal }) => {

    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy à HH'h'mm");
    }

    const formatTimeElapsed = (timeElapsed) => {
        const days = timeElapsed.days && `${timeElapsed.days} jour${timeElapsed.days !== 1 ? 's' : ''}`;
        const hours = timeElapsed.hours && `${timeElapsed.hours} heure${timeElapsed.hours !== 1 ? 's' : ''}`;
        const minutes = timeElapsed.minutes && `${timeElapsed.minutes} minute${timeElapsed.minutes !== 1 ? 's' : ''}`;

        return [days, hours, minutes].filter(Boolean).join(', ');
    }

    const formattedTimeElapsed = task.timeElapsed && formatTimeElapsed(task.timeElapsed);
    const formattedCreatedAtDate = formatDate(task.createdAt);
    const formattedFinishedAtDate = task.finishedAt && formatDate(task.finishedAt);

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
                            <h4 className='task-title'>{task.title}</h4>
                            {task.description && <p className='task-desc'>{task.description}</p>}
                            <div className='task-info'>
                                <p>{'Tâche créée le : ' + formattedCreatedAtDate}</p>
                                {task.finishedAt && <p>{'Tâche finie le : ' + formattedFinishedAtDate}</p>}
                                {task.timeElapsed && <p>{'Temps écoulé : ' + formattedTimeElapsed}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default InfoModal;