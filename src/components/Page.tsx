import { ReactNode, useContext } from 'react';
import { NavBar } from '../components/NavBar'
import { UserContext } from '../contexts/UserContext';
import Login from '../pages/login'

interface pageProps {
  children: ReactNode
}

const Page = (props:pageProps) => {
  const { username } = useContext(UserContext)
  const isLoggedIn = true ? username : false

  if (!isLoggedIn) {
    
    return (
      <Login username=""/>
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