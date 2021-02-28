import Login from '../pages/login'
import Cookies from 'js-cookie'
import { NavBar } from '../components/NavBar'

const withAuth = Component => {
  
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    // const { isLoggedIn } = props;
    const isLoggedIn = Cookies.get('username') ? true : false;
    // const { isLoggedIn } = {isLoggedIn:true};

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return (
        <Login />
      );
    }

    // If user is logged in, return original component
    return (
    <>
      <NavBar/>
      <Component {...props} />
    </>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth