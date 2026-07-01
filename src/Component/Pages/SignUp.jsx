import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const SignUp = ({ setLoggedIn }) => {

    const { createUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUp = (e) => {
        setSuccess(false);
        setError(null);
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            return;
        }
        createUser(name, email, password)
        .then(() => { 
            setSuccess(true);
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
        });
        console.log(name, email, password);
    }

    return (
        <div className='bg-gray-100 p-6 rounded-xl border shadow-xl w-full max-w-md'>
            <h1 className='text-3xl font-bold mb-4'>Sign Up for Your Account</h1>
            <form onSubmit={handleSignUp}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1' htmlFor='email'>Full Name</label>
                    <input className='w-full border rounded px-3 py-2' name='name' type='text' id='name' placeholder='Enter your full name' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1' htmlFor='email'>Email</label>
                    <input className='w-full border rounded px-3 py-2' name='email' type='email' id='email' placeholder='Enter your email' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1' htmlFor='password'>Password</label>
                    <input className='w-full border rounded px-3 py-2' name='password' type='password' id='password' placeholder='Enter your password' />
                </div>
                <button onClick={() => setLoggedIn(true)} className='text-blue-700 mb-2 hover:underline'>Already have an account? Sign In</button>
                <button className='w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600 transition duration-200' type='submit'>Sign Up</button>
                {
                    success && <p className='text-green-500 mt-4'>Account created successfully!</p>
                }
                {
                    error && <p className='text-red-500 mt-4'>{error}</p>
                }
            </form>
        </div>
    );
};

export default SignUp;