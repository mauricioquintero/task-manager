import { Link } from "react-router-dom";

import imageSignup from '/src/assets/signup_form.png';
import imageTasks from '/src/assets/task_list.png';

import { SiSpringboot, SiReact, SiTailwindcss, SiPostgresql } from "react-icons/si";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-dracula-background flex flex-col items-center text-center">
            {/* Header Section */}
            <div className="w-full py-32 bg-dracula-current-line grid place-items-center">
                <h1 className="text-5xl font-bold text-dracula-foreground">Task Manager</h1>
                <p className="text-lg text-dracula-foreground mt-2">Get things done</p>
                <div className="mt-6 space-x-4">
                    <Link
                        to="/signup"
                        className="px-6 py-2 bg-dracula-purple font-bold text-white rounded-lg shadow-md
                        hover:bg-dracula-foreground hover:text-dracula-background transition"
                    >
                        Get started
                    </Link>
                    <a
                        href="https://github.com/your-repo-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 outline-2 outline-dracula-purple font-bold text-white rounded-lg
                        shadow-md hover:bg-dracula-foreground hover:text-dracula-background
                        hover:outline-dracula-foreground transition"
                    >
                        GitHub
                    </a>
                </div>
            </div>

            {/* About Section - Feature Cards */}
            <div className="w-full max-w-5xl px-6 mt-16">
                <h2 className="text-3xl font-bold text-dracula-foreground text-center mb-10">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Signup/Login Card */}
                    <div className="bg-dracula-current-line p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        <div className="w-52 h-24 bg-dracula-foreground rounded-md mb-4">
                            <img src={imageSignup} alt="Image_signup"/>
                        </div>
                        <h3 className="text-xl font-semibold text-dracula-foreground mb-2">Signup & Login</h3>
                        <p className="text-dracula-foreground text-sm">
                            Create an account and manage your own tasks securely. Your tasks are private and only visible to you.
                        </p>
                    </div>

                    {/* Task Management Features Card */}
                    <div className="bg-dracula-current-line p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        <div className="w-52 h-24 bg-dracula-foreground rounded-md mb-4">
                            <img src={imageTasks} alt="Image_tasks"/>
                        </div> {/* Placeholder for Image */}
                        <h3 className="text-xl font-semibold text-dracula-foreground mb-2">Task Manager Features</h3>
                        <p className="text-dracula-foreground text-sm">
                            Add, edit, delete, search, and filter your tasks effortlessly. Stay organized and productive.
                        </p>
                    </div>

                    {/* Tech Stack Card */}
                    <div className="bg-dracula-current-line p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        {/* Tech Icons Container */}
                        <div className="flex flex-row justify-center items-center space-x-6 mb-4">
                            <SiReact className="text-dracula-cyan text-7xl" />
                            <SiSpringboot className="text-dracula-green text-7xl" />
                            <SiPostgresql className="text-dracula-comment text-7xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-dracula-foreground mb-2">Built With</h3>
                        <p className="text-dracula-foreground text-sm">
                            Developed using React, TailwindCSS, Spring Boot, and PostgreSQL. Fully responsive and secure.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}