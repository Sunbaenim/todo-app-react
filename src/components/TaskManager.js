import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrlTask from '../apiConfig';
import './TaskManager.css';
import TaskList from './TaskList';
import AddTaskModal from './modals/AddTaskModal';
import ToastModal from './modals/ToastModal';

const TaskManager = () => {

    const [tasksInProgress, setTasksInProgress] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);
    const [isShowTasksInProgress, setIsShowTasksInProgress] = useState(true);

    const fetchTasksInProgress = async () => {
        try {
            const response = await axios.get(apiUrlTask + '?isFinished=false');
            setTasksInProgress(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const fetchFinishedTasks = async () => {
        try {
            const response = await axios.get(apiUrlTask + '?isFinished=true');
            setFinishedTasks(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchTasks = async () => {
        await fetchTasksInProgress();
        await fetchFinishedTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    const handleOpenAddTask = () => {
        setIsAddTaskModalOpen(!isAddTaskModalOpen);
    }

    const handleTabTypeClick = (isTabInProgress) => {
        isTabInProgress ? setIsShowTasksInProgress(true) : setIsShowTasksInProgress(false);
    }

    const handleTaskUpdate = () => {
        fetchTasks();
    }

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    const handleToastModal = (message, color = 'green') => {
        setIsToastOpen(true);
        const timeout = setTimeout(() => {
            setIsToastOpen(false);
        }, 3000);
        setToastMessage(message);
        setToastColor(color);
        return () => clearTimeout(timeout);
    }

    return (
        <div className='tasks-app'>
            <div className='tasks-nav'>
                <div onClick={() => handleTabTypeClick(true)} className={isShowTasksInProgress ? 'nav-active' : ''}>
                    <h3>Tâches en cours</h3>
                </div>
                <div onClick={() => handleTabTypeClick(false)} className={!isShowTasksInProgress ? 'nav-active' : ''}>
                    <h3>Tâches finies</h3>
                </div>
            </div>
            <TaskList tasks={isShowTasksInProgress ? tasksInProgress : finishedTasks} onTaskUpdate={handleTaskUpdate} handleToastModal={handleToastModal} />
            <AddTaskModal isOpen={isAddTaskModalOpen} handleModal={handleOpenAddTask} onTaskUpdate={handleTaskUpdate} handleToastModal={handleToastModal }/>
            {!isAddTaskModalOpen && (
                <div className='add-task-container' onClick={handleOpenAddTask}>
                    <span>+</span>
                </div>
            )}
            <ToastModal isOpen={isToastOpen} message={toastMessage} color={toastColor} />
        </div>
    );
    
}

export default TaskManager;