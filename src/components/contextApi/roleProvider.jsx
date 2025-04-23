import React, {useState, useEffect, createContext} from 'react'
export const RoleContext = createContext();
 const RoleProvider = ({children}) => {
    const [role, setRole] = useState(localStorage.getItem('role') || 'user');
    useEffect(() => {
        localStorage.setItem("role", role);
      }, [role]);
  return (
    <RoleContext.Provider value={{role, setRole}}>
        {children}
    </RoleContext.Provider>
  )
}
export default RoleProvider;