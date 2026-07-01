import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import TaskCard from './TaskCard';
// Column component represents each column in the Kanban board
const Column = ({ id, title, tasks }) => {
// Make the column a droppable area using useDroppable hook
    const { setNodeRef } = useDroppable({id});

    return (
        <div
            ref={setNodeRef}
            className='bg-gray-100 p-6 rounded-xl border min-h-dvh'
        >

            <h2 className='text-xl font-bold mb-4 capitalize'>
                {title}
            </h2>

            <div className='space-y-3'>

                {
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))
                }

            </div>

        </div>
    );
};

export default Column;