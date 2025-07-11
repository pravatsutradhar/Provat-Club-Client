import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast'; // Import custom toast

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user and token from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    // Mutation for user login
    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post('/auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            toast.success(data.message || 'Logged in successfully!');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        },
    });

    // Mutation for user registration
    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const { data } = await api.post('/auth/register', userData);
            return data;
        },
        onSuccess: (data) => {
            // For registration, we typically just show success and redirect to login
            toast.success(data.message || 'Registration successful! Please log in.');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        },
    });

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
    };

    const value = {
        user,
        token,
        loading,
        isLoggedIn: !!user,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout,
        loginStatus: loginMutation.status,
        registerStatus: registerMutation.status,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};