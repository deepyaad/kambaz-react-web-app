import { Link } from "react-router-dom";
import {Form} from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <Form.Control id="wd-username"
             placeholder="username"
             className="mb-0"/><br />
      <Form.Control id="wd-password"
             placeholder="password" type="password"
             className="mb-0"/><br />
      <Link id="wd-signin-btn"
            to="/Kambaz/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign in </Link><br />
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
    </div> 
  );
}


/*

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../database";

export default function Signin() {
 const [credentials, setCredentials] = useState({ username: "", password: "" });
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const signin = () => {
   console.log("Trying to sign in with:", credentials);
   console.log("Users available:", db.users);
   const user = db.users.find(
     (u: any) =>
       u.username === credentials.username &&
       u.password === credentials.password
   );
   if (!user) {
     alert("Invalid username or password");
     return;
   }
   dispatch(setCurrentUser(user));
   navigate("/Kambaz/Dashboard");
 };
 return (
    <div id="wd-signin-screen">
    <h1>Sign in</h1>
    <input
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control mb-2"
          placeholder="username"
          id="wd-username"
        />
    <input
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="form-control mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />
    <button
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100"
    >
          Sign in
    </button>
    <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Sign up
    </Link>
    </div>
 );
}

//// FIRST CONFUSION

// import {Form} from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = () => {
    const user = db.users.find(
    (u: any) => u.username === credentials.username && u.password === credentials.password);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      <input defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2" placeholder="username" id="wd-username" />

      <input defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2" placeholder="password" type="password" id="wd-password" />

      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>

      <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
    </div>
    );
}

*/