import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';
import Column from './Column';
import {DndContext, closestCorners} from '@dnd-kit/core';
const KanbanBoard = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    // Define the columns for the Kanban board
    const columns = ['todo', 'progress', 'done', 'completed'];
    // Function to find the column of a task by its ID
    const findColumn = (taskId) => {
        for (const column in tasks) {

            const exists = tasks[column].find(
                task => task.id === taskId
            );

            if (exists) return column;
        }
    };

    // Handle the drag end event to move tasks between columns

    const handleDragEnd = (event) => {

        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overColumn = over.id;

        const activeColumn = findColumn(activeId);

        if (!activeColumn) return;

        // SAME COLUMN
        if (activeColumn === overColumn) return;

        const task = tasks[activeColumn].find(
            task => task.id === activeId
        );
// MOVE TASK
        setTasks(prev => ({
            ...prev,

            [activeColumn]: prev[activeColumn].filter(
                task => task.id !== activeId
            ),

            [overColumn]: [...prev[overColumn], task],
        }));
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >

            <div className='grid grid-cols-4 gap-4'>

                {
                    columns.map(column => (
                        <Column
                            key={column}
                            id={column}
                            title={column}
                            tasks={tasks[column]}
                        />
                    ))
                }

            </div>

        </DndContext>
    );
};

export default KanbanBoard;