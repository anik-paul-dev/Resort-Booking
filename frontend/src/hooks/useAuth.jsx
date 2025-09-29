import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from '../services/auth'
import { forgotPassword as apiForgotPassword } from '../services/auth'

export const useAuth = () => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        } catch (err) {
          localStorage.removeItem('token')
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    }

    checkAuth()
  }, [setUser, setIsAuthenticated])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiLogin(email, password)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
      throw err
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiRegister(userData)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setLoading(false)
      throw err
    }
  }

  const logout = () => {
    apiLogout()
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const forgotPassword = async (email) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const response = await apiForgotPassword(email)
      setSuccess(response.message)
      setLoading(false)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email')
      setLoading(false)
      throw err
    }
  }

  return {
    user,
    loading,
    error,
    success,
    login,
    register,
    logout,
    forgotPassword
  }
}