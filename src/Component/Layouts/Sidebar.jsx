import React from 'react';
import { FaRegUserCircle, FaTasks } from 'react-icons/fa';
import { HiOutlineChartBar } from 'react-icons/hi';
import { LuCalendar, LuSettings } from 'react-icons/lu';
import { MdAccessTime, MdOutlineDashboard } from "react-icons/md";
import { TbBell, TbLayoutKanban } from 'react-icons/tb';

const Sidebar = () => {
    return (
        <div className='p-4'>
            <div>
                <h1 className=' text-4xl font-bold'>Task<span className='text-blue-700'>Flow</span></h1>
            </div>
            <div className="divider"></div>
            <small className='text-sm'>Workspace</small>
            <div>
                <ul className='menu min-h-full w-full '>
                    <li className='menu-item active'><a><MdOutlineDashboard></MdOutlineDashboard> Dashboard</a></li>
                    <li className='menu-item'><a><FaTasks></FaTasks> Tasks </a></li>
                    <li className='menu-item'><a><TbLayoutKanban></TbLayoutKanban> Kanban Board</a></li>
                    <li className='menu-item'><a><LuCalendar></LuCalendar> Calendar</a></li>
                    <li className='menu-item'><a><HiOutlineChartBar></HiOutlineChartBar> Analytics</a></li>
                </ul>
            </div>
            <small className='text-sm'>Tools</small>
            <div>
                <ul className='menu min-h-full w-full '>
                    <li className='menu-item'><a><MdAccessTime></MdAccessTime> Pomodoro</a></li>
                </ul>
            </div>
            <small className='text-sm'>Account</small>
            <div>
                <ul className='menu min-h-full w-full '>
                    <li className='menu-item'><a><LuSettings></LuSettings> Settings</a></li>
                    <li className='menu-item'><a><FaRegUserCircle></FaRegUserCircle> Profile</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;