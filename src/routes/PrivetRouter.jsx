import React, { Children, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <div className='flex items-center justify-center h-screen'>
            <div className='w-16 h-16 border-4 border-blue-700 border-dashed rounded-full animate-spin'></div>
        </div>
    }

    if (!user) {
        return (
            <Navigate to='/auth' state={location.pathname} replace></Navigate>
        )
    }
    return children
};

export default PrivetRouter;