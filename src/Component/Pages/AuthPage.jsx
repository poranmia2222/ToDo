import { useState } from "react";
import { LuCheck } from "react-icons/lu";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const FEATURES = [
    "Kanban board with smooth drag & drop",
    "Smart due dates, priorities and reminders",
    "Your data saved locally — works offline",
];

const AuthPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left panel */}
            <div className="left-panel w-full lg:w-6/12">
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Task<span className="text-amber-400">Flow</span>
                    </h1>
                </div>

                <div className="relative z-10 py-12">
                    <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                        Stay focused,
                        <br />
                        get things{" "}
                        <span className="text-amber-400">done.</span>
                    </h2>
                    <p className="mt-6 max-w-md text-white/70">
                        Your personal command center for tasks, deadlines, and
                        everything that matters.
                    </p>

                    <ul className="mt-8 space-y-3">
                        {FEATURES.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-3 text-sm text-white/80"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                                    <LuCheck className="text-xs" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative z-10 text-xs text-white/40">
                    Free forever · No credit card required
                </p>
            </div>

            {/* Right panel */}
            <div className="flex w-full items-center justify-center bg-base-100 p-6 lg:w-6/12">
                {loggedIn ? (
                    <SignIn setLoggedIn={setLoggedIn} />
                ) : (
                    <SignUp setLoggedIn={setLoggedIn} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
