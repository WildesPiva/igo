import { NavBar } from '../components/NavBar'
import Login from '../pages/login'

const withAuth = (Component) => {
  
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { isLoggedIn } = props;

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return (
        <Login username=""/>
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