import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgotpassword', { email })
  return response.data
}

export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/resetpassword/${token}`, { password })
  return response.data
}