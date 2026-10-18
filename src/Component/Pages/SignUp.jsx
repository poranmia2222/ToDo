import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const FRIENDLY_ERRORS = {
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-requestfailed": "Network error — check your connection.",
};

const PASSWORD_RULES =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+]).{8,}$/;

const SignUp = ({ setLoggedIn }) => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        const form = event.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!PASSWORD_RULES.test(password)) {
            setError(
                "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a special character.",
            );
            return;
        }

        setLoading(true);
        try {
            await createUser(name, email, password);
            setSuccess(true);
            // Brief pause so the success message is visible, then head in.
            setTimeout(() => navigate("/", { replace: true }), 900);
        } catch (err) {
            setError(
                FRIENDLY_ERRORS[err.code] ??
                    "Couldn't create your account. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-base-content/50">
                Start planning your work in seconds.
            </p>

            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                        Full name
                    </span>
                    <input
                        className="input w-full"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Doe"
                        required
                    />
                </label>

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
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        required
                    />
                    <span className="mt-1.5 block text-xs text-base-content/40">
                        8+ characters with uppercase, lowercase, a number and a
                        special character.
                    </span>
                </label>

                {error && (
                    <div role="alert" className="alert alert-error text-sm">
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div role="alert" className="alert alert-success text-sm">
                        <span>Account created — taking you inside…</span>
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
                    Sign Up
                </button>
            </form>

            <button
                type="button"
                onClick={() => setLoggedIn(true)}
                className="mt-4 block w-full text-center text-sm text-primary hover:underline"
            >
                Already have an account? Sign In
            </button>
        </div>
    );
};

export default SignUp;
