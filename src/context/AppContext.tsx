import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipos TypeScript
interface User {
  name: string;
  email: string;
  plan: 'basic' | 'pro' | 'enterprise';
}

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  totalUsers: number;
}

// Criar o contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider do contexto (componente que "fornece" os dados)
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [totalUsers, setTotalUsers] = useState(500);
  
  const isLoggedIn = user !== null;
  
  // Simula contador de usuários em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUsers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Restaurar usuário do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  return (
    <AppContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout,
      totalUsers
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};