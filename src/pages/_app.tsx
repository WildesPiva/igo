import '../styles/global.css'
import { UserProvider } from '../contexts/UserContext'
import Page from '../components/Page'

function MyApp({ Component, pageProps, ...rest}) {

  return( 
    <UserProvider username={pageProps.username} theme={pageProps.theme}>
      <Page>
        <Component {...pageProps}/>
      </Page>
    </UserProvider>
  )
}

export default MyApp