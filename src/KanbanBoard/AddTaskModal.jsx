import { useContext, useEffect } from "react";
import { LuX } from "react-icons/lu";
import { TaskContext } from "../Context/TaskContext";
import { COLUMNS, PRIORITIES } from "../constants/columns";
import { todayISO } from "../utils/date";

/*
  Global create/edit task dialog. It reads its open state from TaskContext
  (openAddTask / openEditTask) and is mounted once by the dashboard layout.
*/
const AddTaskModal = () => {
    const { modal, closeTaskModal, addTask, updateTask } = useContext(TaskContext);
    const { open, column, task } = modal;

    /* Close on Escape and lock page scroll while open. */
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") closeTaskModal();
        };
        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, closeTaskModal]);

    if (!open) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const data = {
            title: form.title.value.trim(),
            description: form.description.value.trim(),
            priority: form.priority.value,
            date: form.date.value,
        };
        if (!data.title) return;

        const targetColumn = form.status.value;
        if (task) updateTask(task.id, data, targetColumn);
        else addTask(data, targetColumn);

        closeTaskModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeTaskModal}
                aria-hidden="true"
            />

            <form
                onSubmit={handleSubmit}
                className="animate-card-in relative w-full max-w-lg rounded-box border border-base-300 bg-base-100 p-6 shadow-2xl"
            >
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            {task ? "Edit task" : "New task"}
                        </h2>
                        <p className="mt-0.5 text-sm text-base-content/50">
                            {task
                                ? "Update the details or move it to another column."
                                : "Capture it now, organize it later."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeTaskModal}
                        aria-label="Close dialog"
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <LuX />
                    </button>
                </div>

                {/* Title */}
                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                        Title
                    </span>
                    <input
                        type="text"
                        name="title"
                        autoFocus
                        defaultValue={task?.title ?? ""}
                        placeholder="e.g. Prepare quarterly report"
                        className="input w-full"
                        required
                    />
                </label>

                {/* Description */}
                <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-medium">
                        Description{" "}
                        <span className="font-normal text-base-content/40">(optional)</span>
                    </span>
                    <textarea
                        name="description"
                        defaultValue={task?.description ?? ""}
                        placeholder="Add a few details…"
                        rows={3}
                        className="textarea w-full resize-none"
                    />
                </label>

                {/* Priority / status / date */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">
                            Priority
                        </span>
                        <select
                            name="priority"
                            defaultValue={task?.priority ?? "medium"}
                            className="select w-full"
                        >
                            {PRIORITIES.map((priority) => (
                                <option key={priority.id} value={priority.id}>
                                    {priority.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">
                            Due date
                        </span>
                        <input
                            type="date"
                            name="date"
                            defaultValue={task?.date ?? todayISO()}
                            className="input w-full"
                        />
                    </label>

                    <label className="block sm:col-span-2">
                        <span className="mb-1.5 block text-sm font-medium">
                            Status
                        </span>
                        <select
                            name="status"
                            defaultValue={column ?? "todo"}
                            className="select w-full"
                        >
                            {COLUMNS.map((col) => (
                                <option key={col.id} value={col.id}>
                                    {col.title}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={closeTaskModal}
                        className="btn btn-ghost"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {task ? "Save changes" : "Create task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskModal;
