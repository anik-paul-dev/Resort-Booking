import { useAuth as useAuthContext } from '../context/AuthContext';

export const useCustomAuth = () => {
  const { user, login, register, logout, loading } = useAuthContext();
  
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