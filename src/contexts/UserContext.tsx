import { createContext, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'

interface UserContextData {
  username: string;
  saveUser: (user:string) => void
}

interface UserProviderProps {
  children: ReactNode;
  username: string;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children, ...rest }:UserProviderProps) {
  const [username, setUsername] = useState(rest.username);
  
  function saveUser(user:string){
    setUsername(user)
    Cookies.set('username', user)
  }

  return (
    <UserContext.Provider 
      value={{
        username,
        saveUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}