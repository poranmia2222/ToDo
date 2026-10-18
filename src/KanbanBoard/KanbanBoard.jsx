import { useCallback, useContext, useMemo, useState } from "react";
import {
    closestCorners,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { LuPlus } from "react-icons/lu";
import { TaskContext } from "../Context/TaskContext";
import { COLUMNS, COLUMN_IDS } from "../constants/columns";
import { matchesQuery } from "../utils/taskUtils";
import Column from "./Column";
import { TaskCardBody } from "./TaskCard";

const KanbanBoard = () => {
    const { tasks, moveTask, query, openAddTask } = useContext(TaskContext);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor),
    );

    /* Ignore the card currently being dragged when picking a drop target,
       so hovering another card cleanly means "insert here". */
    const collisionDetection = useCallback((args) => {
        const { droppableContainers, ...rest } = args;
        return closestCorners({
            ...rest,
            droppableContainers: droppableContainers.filter(
                (container) => container.id !== args.active?.id,
            ),
        });
    }, []);

    const findColumn = (taskId) =>
        COLUMN_IDS.find((column) =>
            tasks[column].some((task) => task.id === taskId),
        ) ?? null;

    const findTask = (taskId) => {
        for (const column of COLUMN_IDS) {
            const task = tasks[column].find((t) => t.id === taskId);
            if (task) return { task, column };
        }
        return null;
    };

    const handleDragStart = ({ active }) => {
        const found = findTask(active.id);
        if (found) setActiveTask(found);
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveTask(null);
        if (!over || active.id === over.id) return;

        const from = findColumn(active.id);
        if (!from) return;

        // Dropped on a column -> append. Dropped on a card -> insert before it.
        const overIsColumn = COLUMN_IDS.includes(over.id);
        const to = overIsColumn ? over.id : findColumn(over.id);
        const beforeId = overIsColumn ? null : over.id;

        if (!to) return;
        // Moving around inside the same column without a target card: no-op.
        if (from === to && !beforeId) return;

        moveTask(active.id, to, beforeId);
    };

    /* Filter every column by the global search query. */
    const filteredTasks = useMemo(
        () =>
            COLUMN_IDS.reduce(
                (acc, column) => ({
                    ...acc,
                    [column]: tasks[column].filter((task) =>
                        matchesQuery(task, query),
                    ),
                }),
                {},
            ),
        [tasks, query],
    );

    const searching = query.trim().length > 0;
    const visibleCount = COLUMN_IDS.reduce(
        (sum, column) => sum + filteredTasks[column].length,
        0,
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveTask(null)}
        >
            {/* Page header */}
            <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Kanban Board</h1>
                    <p className="mt-1 text-sm text-base-content/60">
                        {searching
                            ? `${visibleCount} task${visibleCount === 1 ? "" : "s"} matching “${query.trim()}”`
                            : "Drag tasks between columns — or onto another card to reorder."}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => openAddTask()}
                    className="btn btn-primary"
                >
                    <LuPlus /> New Task
                </button>
            </header>

            {/* Columns */}
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
                {COLUMNS.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        Icon={column.Icon}
                        tasks={filteredTasks[column.id]}
                        searching={searching}
                    />
                ))}
            </div>

            {/* Floating preview while dragging */}
            <DragOverlay dropAnimation={{ duration: 180, easing: "ease-out" }}>
                {activeTask && (
                    <div className="w-64 rotate-2 cursor-grabbing xl:w-72">
                        <TaskCardBody
                            task={activeTask.task}
                            columnId={activeTask.column}
                            overlay
                        />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;
