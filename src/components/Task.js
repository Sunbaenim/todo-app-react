import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import apiUrlTask from '../apiConfig';
import './Task.css';
import infoImage from '../assets/info.svg';
import settingsImage from '../assets/settings.svg';
import completedImage from '../assets/completed.svg';
import InfoModal from './modals/InfoModal';
import SettingsModal from './modals/SettingsModal';

const Task = ({ task, isOdd, onTaskUpdate, handleToastModal }) => {

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const optionsContainerRef = useRef();
    const mainContainerRef = useRef();
    const isFirstRender = useRef(true);

    const handleInfoModal = () => {
        setIsInfoModalOpen(!isInfoModalOpen);
    }

    const handleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    }

    const handleChangeStatusFinishedTask = () => {
        task.isFinished = !task.isFinished;
        axios.put(apiUrlTask + task.id, task)
        .then(res => {
            handleToastModal('Le statut de la tâche a été changé.');
            onTaskUpdate();
        }).catch(err => {
            handleToastModal('Une erreur est survenue.', 'red');
            console.error(err);
        });
    }

    useEffect(() => {
        if (isFirstRender.current) {
            const optionsContainerWidth = optionsContainerRef.current.clientWidth;
            const maxWidth = `calc(100% - ${optionsContainerWidth / 16}rem)`;
            mainContainerRef.current.style.maxWidth = maxWidth;
            isFirstRender.current = false;
        }
    }, []);

    return (
        <>
            <InfoModal task={task} isOpen={isInfoModalOpen} handleModal={handleInfoModal} />
            <div className='task' style={isOdd ? {backgroundColor: '#eee'} : {backgroundColor: 'initial'}}>
                <div className='main-container' ref={mainContainerRef}>
                    <h4 className='task-title'>{task.title}</h4>
                    <p className='task-desc'>{task.description ? task.description : '\u200B'}</p>
                </div>
                <div className='options-container' ref={optionsContainerRef}>
                    <div className='complete-button-container' onClick={handleChangeStatusFinishedTask}>
                        <div className='square'>
                            {task.isFinished &&
                                <img
                                    className='completed-image'
                                    src={completedImage}
                                    alt='Icone tâche complétée'
                                />
                            }
                        </div>
                    </div>
                    <div className='infos-container'>
                        <img
                            className='info-image'
                            src={infoImage}
                            alt='Icone informations'
                            onClick={handleInfoModal}
                        />
                    </div>
                    <div className='settings-container'>
                        <img
                            className='settings-image'
                            src={settingsImage}
                            alt='Icone paramètres'
                            onClick={handleSettingsModal}
                            style={isSettingsModalOpen ? { visibility: 'hidden' } : {} }
                        />
                        <SettingsModal task={task} isOpen={isSettingsModalOpen} handleModal={handleSettingsModal} onTaskUpdate={onTaskUpdate} handleToastModal={handleToastModal} />
                    </div>
                </div>
            </div>
        </>
    );
}
 export default Task;