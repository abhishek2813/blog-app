// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

const Auth = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"))
    setUser(userData)
  },[])
  return (
    <Auth.Provider value={{ user, setUser }}>
      {children} 
    </Auth.Provider>
  );
}

export { AuthProvider, Auth };
