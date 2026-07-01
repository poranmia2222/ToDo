import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { CSS} from '@dnd-kit/utilities';

const TaskCard = ({ task }) => {
// Make the task card draggable using useDraggable hook
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: task.id,
    });
// Apply the transform to the style of the task card for smooth dragging
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className='bg-white p-4 rounded-lg shadow cursor-grab active:cursor-grabbing border-l-4 border-primary'
        >

            <h3 className='font-bold'>
                {task.title}
            </h3>
            <p className='text-gray-600'>
                {task.description}
            </p>
            <p>
                {task.date}
            </p>
            <p>{task.priority}</p>

        </div>
    );
};

export default TaskCard;