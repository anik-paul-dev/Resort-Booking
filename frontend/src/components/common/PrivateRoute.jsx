import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const PrivateRoute = ({ requiredRole }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="text-center py-5">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default PrivateRoute