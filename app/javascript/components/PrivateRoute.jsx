import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const jwtToken = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const checkTokenValidity = () => {
        fetch('/api/verify_jwt', {
            headers: {Authorization: `Bearer ${jwtToken}`},
        }).then((response) => {
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false)
            }

            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
        })
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login')
    }

    useEffect(() => {
        if (jwtToken) {
            checkTokenValidity();
        } else {
            setIsLoading(false)
            setIsAuthenticated(false);
        }
    }, [jwtToken]);

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
