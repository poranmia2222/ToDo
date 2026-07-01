import React, { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FaRegMoon } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { RiQuestionLine } from 'react-icons/ri';
import { TbBell } from 'react-icons/tb';
import AddTaskModal from '../../KanbanBoard/AddTaskModal';

const Navber = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleAddTask = () => {
        console.log('Add Task clicked');
        setOpenModal(!openModal)
    }
    console.log(openModal);
    return (
        <div className='py-4 px-6 bg flex items-center justify-between'>
            <div>
                {/* Search bar */}
                <label className=" flex relative">
                    <IoSearchSharp className='absolute top-2.5 left-3'></IoSearchSharp>
                    <input className='p-1 px-8 w-100 rounded-xl border' type="search" required placeholder="Search tasks, projects..." />
                </label>
            </div>
            {/* Top actions */}
            <div className='flex items-center justify-between gap-2'>

                <div className='bg  rounded-2xl'>
                    <button className="btn btn-outline btn-primary  rounded-2xl">
                        <TbBell className='text-lg'></TbBell>
                    </button>
                </div>
                <div className='bg  rounded-2xl'>
                    <button className="btn btn-outline btn-primary  rounded-2xl">
                        <FaRegMoon ></FaRegMoon>
                    </button>
                </div>
                <div className='bg  rounded-2xl'>
                    <button className="btn btn-outline btn-primary  rounded-2xl">
                        <RiQuestionLine className='text-lg'></RiQuestionLine>
                    </button>
                </div>
                <div className="avatar avatar-online avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>
                <div className='flex items-center g-2'>
                    <button onClick={handleAddTask} className='btn btn-primary '><FiPlus></FiPlus> Add Task</button>
                </div>

            </div>
            {
                openModal && <AddTaskModal setOpenModal={setOpenModal}></AddTaskModal>
            }
        </div>
    );
};

export default Navber;