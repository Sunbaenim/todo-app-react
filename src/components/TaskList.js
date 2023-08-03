import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onTaskUpdate, handleToastModal }) => {
    return (
        <div className='task-list'>
            {tasks && Array.isArray(tasks) && tasks.map((task, index) => (
                <Task key={task.id} task={task} isOdd={index % 2 === 1} onTaskUpdate={onTaskUpdate} handleToastModal={handleToastModal} />
            ))}
        </div>
    );
}

export default TaskList;