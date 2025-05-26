import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-navigation">
      {!currentUser && (
        <>
          <Link to={`/Kambaz/Account/Signin`}>Signin</Link> <br />
          <Link to={`/Kambaz/Account/Signup`}>Signup</Link> <br />
        </>
      )}
      {currentUser && (
        <Link to={`/Kambaz/Account/Profile`}>Profile</Link>
      )}
    </div>
  );
}


/*
import { Link,  } from "react-router-dom"; // useLocation
//import { useSelector } from "react-redux";

export default function AccountNavigation() {

    //const { currentUser } = useSelector((state: any) => state.accountReducer);
    //const links = currentUser ? ["Profile"] : ["Signin", "Signup"]; 
    //const { pathname } = useLocation();

    return (
        <div id="wd-account-navigation">
            <Link to={`/Kambaz/Account/Signin`} > Signin </Link> <br/>
            <Link to={`/Kambaz/Account/Signup`} > Signup </Link> <br/>
            <Link to={`/Kambaz/Account/Profile`} > Profile </Link> <br/>
        </div>
    );
}
    */