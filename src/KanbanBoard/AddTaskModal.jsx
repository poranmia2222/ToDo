import React, { useContext, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { TaskContext } from '../Context/TaskContext';

const AddTaskModal = ({ setOpenModal }) => {
    const { addTask } = useContext(TaskContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const priority = form.priority.value;
        const date = form.date.value;

        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            priority,
            date
        };
        addTask(newTask)
        form.reset();


    }
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <form id='task_modal' onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-100 absolute">
                <h2 className="text-2xl font-bold mb-4">
                    Add Task
                </h2>
                <button onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle btn-ghost relative left-82 bottom-14 font-bold"><ImCross /></button>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    className="input input-bordered w-full mb-4"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered w-full mb-4"
                    required
                />
                <select
                    name="priority"
                    className="select select-bordered w-full mb-4"
                    required
                >
                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>
                </select>
                <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full mb-4"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Create Task
                </button>

            </form>

        </div>
    );
};

export default AddTaskModal;