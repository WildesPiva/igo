import { useSession } from 'next-auth/client'
import { ReactNode } from 'react';
import { NavBar } from '../components/NavBar'
// import { UserContext } from '../contexts/UserContext';
import Login from '../pages/login'

interface pageProps {
  children: ReactNode
}

const Page = (props:pageProps) => {
  const [ session, loading ] = useSession()
  // const { username } = useContext(UserContext)
  // const isLoggedIn = true ? username : false

  if (!session) {
    
    return (
      <Login />
    );
  }

  return (
    <>
      <NavBar/>
      {props.children}
    </>
  );
};

export default Page