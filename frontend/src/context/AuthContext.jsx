import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios base url depending on environment
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get('/api/auth/user');
                    setAdmin(res.data);
                } catch (error) {
                    console.error('Auth error', error);
                    setToken(null);
                    localStorage.removeItem('adminToken');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            setToken(res.data.token);
            localStorage.setItem('adminToken', res.data.token);
            toast.success('Logged in successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setAdmin(null);
        localStorage.removeItem('adminToken');
        delete axios.defaults.headers.common['Authorization'];
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ token, admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
