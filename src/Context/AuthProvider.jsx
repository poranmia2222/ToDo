import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
    // Current user
    const [user, setUser] = useState(null);
    // Whether the initial auth check is still running
    const [loading, setLoading] = useState(true);

    // Create a new account (returns a promise so callers can await it)
    const createUser = async (name, email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        // Surface the fresh displayName immediately (onAuthStateChanged may
        // have already fired with the pre-update user).
        setUser({ ...credential.user, displayName: name });
        return credential;
    };

    // Sign out of the current session
    const logout = () => signOut(auth);

    // Track auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        createUser,
        logout,
        user,
        loading,
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
