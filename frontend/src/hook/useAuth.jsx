import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    RECEPTIONIST: 'receptionist',
    USER: 'user'
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true });
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
            navigate(user.role === 'user' ? '/user-dashboard' : '/dashboard', { replace: true });
        }
    }, [user, allowedRoles, navigate]);

    return children;
};

// Custom hook để dễ dàng sử dụng context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        console.log("Initial user from localStorage:", savedUser);
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            return {
                ...parsed,
                role: parsed.role || 'user'
            };
        }
        return null;
    });

    useEffect(() => {
        console.log("User state changed:", user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const userLogin = (userData) => {
        console.log("Setting user in context:", userData);
        setUser(userData);
    };

    const userLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isStaff = () => {
        return user?.role === ROLES.ADMIN ||
            user?.role === ROLES.MANAGER ||
            user?.role === ROLES.RECEPTIONIST;
    };

    const hasPermission = (allowedRoles) => {
        return allowedRoles.includes(user?.role);
    };

    const contextValue = {
        user,
        userLogin,
        userLogout,
        isStaff,
        hasPermission,
        ROLES
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, ROLES, ProtectedRoute, useAuth };