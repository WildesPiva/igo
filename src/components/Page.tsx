import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { NavBar } from '../components/NavBar'
import { useAuthContext } from '../hooks/useAuth';
// import { UserContext } from '../contexts/UserContext';
// import Login from '../pages/login'

interface pageProps {
  children: ReactNode
}

const Page = (props: pageProps) => {
  const { user } = useAuthContext()

  // if (!user) {
  //   // router.push('/login')
  //   return <Login />
  // }


  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Page