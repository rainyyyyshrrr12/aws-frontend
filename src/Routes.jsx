import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from 'react-router-dom'

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        // Set current user from localStorage if exists
        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        // Redirect to login if no user and not on auth pages
        if (!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname)) {
            navigate("/auth");
        }

        // Redirect to home if logged in and on auth page
        if (userIdFromStorage && location.pathname === '/auth') {
            navigate("/");
        }
    }, [currentUser, navigate, location.pathname]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/profile",
            element: <Profile />
        }
    ]);

    return element;
}

export default ProjectRoutes;