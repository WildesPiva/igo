import { createContext, useState, ReactNode, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'

interface ThemeContextData {
  changeTheme: () => void
}

interface ThemeProviderProps {
  children: ReactNode;
  theme: string;
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
  const [theme, setTheme] = useState(rest.theme === 'darkTheme' ? 'darkTheme' : 'lightTheme');

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  function saveTheme(theme: string) {

    var root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', theme);

    setTheme(theme)
    Cookies.set('theme', theme)
  }

  function changeTheme() {
    if (theme === 'darkTheme') {
      setTheme('lightTheme')
      saveTheme('lightTheme')
    } else {
      setTheme('darkTheme')
      saveTheme('darkTheme')
    }
  }

  // function logout() {
  //   Cookies.remove('level')
  //   Cookies.remove('currentExperience')
  //   Cookies.remove('challengesCompleted')
  //   Cookies.remove('theme')
  // }

  return (
    <ThemeContext.Provider
      value={{
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}


export const useThemeContext = () => {
  return useContext(ThemeContext)
}
