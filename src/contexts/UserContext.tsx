import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

interface UserContextData {
  username: string;
  saveUser: (user:string) => void;
  changeTheme: () => void,
  logout: () => void
}

interface UserProviderProps {
  children: ReactNode;
  username: string;
  theme: string;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children, ...rest }:UserProviderProps) {
  const [username, setUsername] = useState(rest.username);
  const [theme, setTheme] = useState(rest.theme === 'darkTheme' ? 'darkTheme' : 'lightTheme');
  
  function saveUser(user:string){
    setUsername(user)
    Cookies.set('username', user)
  }

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
    Cookies.remove('username')
    Cookies.remove('level')
    Cookies.remove('currentExperience')
    Cookies.remove('challengesCompleted')
    Cookies.remove('theme')
  }

  return (
    <UserContext.Provider 
      value={{
        username,
        saveUser,
        changeTheme,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}