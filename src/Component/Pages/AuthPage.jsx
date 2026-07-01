import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPage = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className='flex space-between items-center'>
            {/* Left Panel */}
            <div className='left-panel w-6/12'>
                <div>
                    <h1 className=' text-4xl font-bold text-white'>Task<span className='text-blue-700'>Flow</span></h1>
                </div>
                <div>
                    <h1 className='text-8xl text-white font-bold'>Stay focused, get things <span className='text-blue-700'>Done.</span></h1>
                    <p className='text-white mt-6'>Your personal command center for tasks, deadlines, and everything that matters.</p>
                </div>
                <div></div>
            </div>
            {/* Right Panel */}
            <div className='right-panel flex flex-col items-center justify-center w-6/12'>
                {
                    loggedIn ? <SignIn setLoggedIn={setLoggedIn} /> : <SignUp setLoggedIn={setLoggedIn} />
                }
            </div>
        </div>
    );
};

export default AuthPage;