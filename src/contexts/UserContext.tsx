import { createContext, useState, ReactNode, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

import Cookies from 'js-cookie'

interface UserContextData {
  changeTheme: () => void,
  logout: () => void,
  signIn, 
  signOut,
  session,
  loading
}

interface UserProviderProps {
  children: ReactNode;
  username: string;
  theme: string;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children, ...rest }:UserProviderProps) {
  const [ session, loading ] = useSession()
  const [theme, setTheme] = useState(rest.theme === 'darkTheme' ? 'darkTheme' : 'lightTheme');
  
  useEffect(()=>{
    saveTheme(theme)
  },[])

  function saveTheme(theme:string) {

    var root = document.getElementsByTagName( 'html' )[0];
    root.setAttribute( 'class', theme );

    setTheme(theme)
    Cookies.set('theme', theme)
  }

  function changeTheme (){
    if ( theme === 'darkTheme' ) {
      setTheme('lightTheme')
      saveTheme('lightTheme')
    } else {
      setTheme('darkTheme')
      saveTheme('darkTheme')
    }
  }

  function logout (){
    Cookies.remove('level')
    Cookies.remove('currentExperience')
    Cookies.remove('challengesCompleted')
    Cookies.remove('theme')
  }

  return (
    <UserContext.Provider 
      value={{
        changeTheme,
        logout,
        signIn, 
        signOut,
        session,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}