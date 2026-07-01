import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const SignIn = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('signed in user:', user);
                navigate(location.state || '/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }
    return (
        <div className='bg-gray-100 p-6 rounded-xl border shadow-xl'>
            <h1 className='text-3xl font-bold mb-4'>Sign In to Your Account</h1>
            <form onSubmit={handleLogin}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1' htmlFor='email'>Email</label>
                    <input className='w-full border rounded px-3 py-2' name='email' type='email' id='email' placeholder='Enter your email' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1' htmlFor='password'>Password</label>
                    <input className='w-full border rounded px-3 py-2' name='password' type='password' id='password' placeholder='Enter your password' />
                </div>
                <button type='button' onClick={() => setLoggedIn(false)} className='text-blue-700 mb-2 hover:underline'>Don't have an account? Sign Up</button>
                <button className='w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600 transition duration-200' type='submit'>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;