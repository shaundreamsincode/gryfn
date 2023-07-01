import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const checkTokenValidity = () => {
        fetch('/api/v1/verify_token', {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }

            setIsLoading(false)
        }).catch((error) => {
            setIsAuthenticated(false)
            setIsLoading(false)
        })
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    useEffect(() => {
        if (token) {
            checkTokenValidity();
        } else {
            setIsLoading(false)
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return(
            <div>
                <Outlet/>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    } else {
        return <Navigate to="/login" />
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    // return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
