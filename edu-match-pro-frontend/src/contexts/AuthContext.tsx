import { createContext, useState, useContext, type PropsWithChildren } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'school' | 'company' | null;
  login: (role: 'school' | 'company') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'school' | 'company' | null>(null);

  const login = (role: 'school' | 'company') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
