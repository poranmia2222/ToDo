import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";

const FRIENDLY_ERRORS = {
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-requestfailed": "Network error — check your connection.",
    "auth/invalid-email": "That email address doesn't look right.",
};

const SignIn = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate(location.state || "/", { replace: true });
        } catch (err) {
            setError(
                FRIENDLY_ERRORS[err.code] ??
                    "Couldn't sign you in. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-base-content/50">
                Sign in to pick up where you left off.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                        Email
                    </span>
                    <input
                        className="input w-full"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                        Password
                    </span>
                    <input
                        className="input w-full"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                    />
                </label>

                {error && (
                    <div role="alert" className="alert alert-error text-sm">
                        <span>{error}</span>
                    </div>
                )}

                <button
                    className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
                    type="submit"
                    disabled={loading}
                >
                    {loading && (
                        <span className="loading loading-spinner loading-sm" />
                    )}
                    Sign In
                </button>
            </form>

            <button
                type="button"
                onClick={() => setLoggedIn(false)}
                className="mt-4 block w-full text-center text-sm text-primary hover:underline"
            >
                Don't have an account? Sign Up
            </button>
        </div>
    );
};

export default SignIn;
