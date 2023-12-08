import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({children}) {
    const {user,isLoading} = useAuth()
    
    if (isLoading) return <h1>Loading</h1>
    if (!user) return <Navigate to="/login"/>
    return <>{children}</>
}