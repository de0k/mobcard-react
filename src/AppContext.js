import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [appName] = useState("ERUM");


  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태와 이메일을 가져옵니다.
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, userEmail, login, logout,appName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
