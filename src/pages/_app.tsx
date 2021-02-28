import '../styles/global.css'
import withAuth from '../components/withAuth'
function MyApp({ Component, pageProps }) {
  return( 
    <Component {...pageProps} />   
  )
}

export default withAuth(MyApp)