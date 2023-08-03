import React, { useState } from 'react';

const AddTaskForm = ({ task, onAddTask }) => {

    const [title, setTitle] = useState(task?.title ? task.title : '');
    const [description, setDescription] = useState(task?.description ? task.description : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Le titre est obligatoire');
            return;
        }
        const newTask = {
            title: title,
            description: description
        };
        onAddTask({...task, ...newTask});
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre* :</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Description :</label>
                <input
                    type='text'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type='submit'>{task ? 'Editer la tâche' : 'Ajouter une tâche'}</button>
        </form>
    );
}

export default AddTaskForm;