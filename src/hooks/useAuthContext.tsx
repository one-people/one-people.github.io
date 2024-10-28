import { createContext, useState, useEffect, useCallback } from 'react';  
  
const AuthContext = createContext({  
  isAuthenticated: false,  
  user: {
    name: '',
    email: ''
  },  
  login: () => {},  
  logout: () => {},  
  checkAuth: () => {}  
});  
  
export const AuthProvider = (children: any) => {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [user, setUser] = useState({
    name: '',
    email: ''
  });  
  
  // 假设有一个从localStorage加载用户状态的方法  
  const loadUser = useCallback(async () => {  
    try {  
      const userStr = localStorage.getItem('user');  
      if (userStr) {  
        const parsedUser = JSON.parse(userStr);  
        setIsAuthenticated(true);  
        setUser(parsedUser);  
      }  
    } catch (error) {  
      console.error('Error loading user:', error);  
    }  
  }, []);  
  
  useEffect(() => {  
    loadUser();  
  }, [loadUser]);  
  
  const login = async () => {  
    // 这里应该是调用后端API进行登录  
    // 假设登录成功并存储用户信息到localStorage  
    localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' }));  
    setIsAuthenticated(true);  
    setUser({ name: 'John Doe', email: 'john.doe@example.com' });  
  };  
  
  const logout = () => {  
    // 清除localStorage中的用户信息  
    localStorage.removeItem('user');  
    setIsAuthenticated(false);  
    setUser({ name: '', email: '' });  
  };  
  
  const checkAuth = () => {  
    // 这里可以添加更复杂的逻辑来检查认证状态  
    return isAuthenticated;  
  };  
  
  return (  
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth }}>  
      {children}  
    </AuthContext.Provider>  
  );  
};