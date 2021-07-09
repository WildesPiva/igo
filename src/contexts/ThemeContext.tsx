import { createContext, useState, ReactNode, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuth';
import { database } from '../services/firebase';

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
  const { user } = useAuthContext()

  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('class', theme);
  }, [theme])

  async function saveTheme(theme: string) {

    var root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', theme);

    setTheme(theme)

    if (user) await database.ref(`themes/${user.id}`).update({
      theme: theme
    })
    // Cookies.set('theme', theme)
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
