import { AuthContextProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'

import '../styles/global.css'

function MyApp({ Component, pageProps, ...rest }) {

  return (
    <AuthContextProvider>
      <ThemeProvider theme={pageProps.theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default MyApp