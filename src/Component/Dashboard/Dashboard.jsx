import React, { useContext } from 'react';
import { FaTasks } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import { format } from 'date-fns';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <div className='bg-gray-100 p-6 rounded-xl mb-4 border flex justify-between items-center'>
                <div>
                    <p>Welcome back!</p>
                    <h1 className='text-4xl font-bold'>Good morning, <span className='text-primary'>{user?.displayName || 'User'}</span></h1>
                </div>
                <div>
                    <p className='text-xl font-bold'>
                        <span className='text-primary'>{format(new Date(), 'EEEE,')}</span>
                        <span>{format(new Date(), ' MMMM dd, yyyy')}</span>

                    </p>
                </div>
            </div>
            {/* Task Summary Cards */}
            <div className='grid grid-cols-4 gap-4 mb-4'>
                <div className='bg-gray-100 p-6 rounded-xl border-b-4 border-primary flex flex-col'>
                    <FaTasks className='text-2xl mb-2' />
                    <p>Total task</p>
                    <h1 className='text-2xl font-bold'>14</h1>
                    <p>+6 this week</p>
                </div>
                <div className='bg-gray-100 p-6 rounded-xl border-b-4 border-red-600 flex flex-col'>
                    <FaTasks className='text-2xl mb-2' />
                    <p>Total task</p>
                    <h1 className='text-2xl font-bold'>14</h1>
                    <p>+6 this week</p>
                </div>
                <div className='bg-gray-100 p-6 rounded-xl border flex flex-col'>
                    <FaTasks className='text-2xl mb-2' />
                    <p>Total task</p>
                    <h1 className='text-2xl font-bold'>14</h1>
                    <p>+6 this week</p>
                </div>
                <div className='bg-gray-100 p-6 rounded-xl border flex flex-col'>
                    <FaTasks className='text-2xl mb-2' />
                    <p>Total task</p>
                    <h1 className='text-2xl font-bold'>14</h1>
                    <p>+6 this week</p>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Dashboard;