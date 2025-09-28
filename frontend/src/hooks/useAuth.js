import { useAuth } from '../context/AuthContext';

export const useAuth = () => {
  const { user, login, register, logout, loading } = useAuth();
  
  return {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
};