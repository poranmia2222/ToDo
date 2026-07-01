import React from 'react';
import Navber from './Navber';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';
import RightPanel from './RightPanel';
import Dashboard from '../Dashboard/Dashboard';
import KanbanBoard from '../../KanbanBoard/KanbanBoard';

const DashboardLayouts = () => {
    return (
        <div className='flex min-h-screen'>
            <div className='w-64 bg'>
                <Sidebar></Sidebar>
            </div>
            <div className='flex flex-1 flex-col'>
                <div>
                    <Navber></Navber>
                </div>
                <div className='grid grid-cols-5 flex-1'>
                    <main className='col-span-4 p-4 m-4 full bg'>
                        
                        <Outlet></Outlet>
                        <KanbanBoard></KanbanBoard>
                    </main>
                    <div className=' h-full bg'>
                        <RightPanel></RightPanel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayouts;