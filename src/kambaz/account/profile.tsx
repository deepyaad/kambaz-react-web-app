import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>

      <Form.Control id="wd-username"
             placeholder="username"
             defaultValue="alice"
             className="mb-2"/>

      <Form.Control id="wd-password"
             placeholder="password"
             type="password"
             className="mb-2"/>

      <Form.Control id="wd-firstname"
             placeholder="first name"
             defaultValue="Alice"
             className="mb-2"/>

      <Form.Control id="wd-lastname"
             placeholder="last name"
             defaultValue="Wonderland"
             className="mb-2"/>
      
      <Form.Control id="wd-dob"
             type="date"
             placeholder="2000-01-01"
             className="mb-2"/>

      <Form.Control id="wd-email"
             type="email"
             placeholder="alice@wonderland"
             className="mb-2"/>

      <Form.Select id="wd-role" className="ms-0 w-75 mb-3 ">
              <option selected>Faculty</option>
              <option value='user'>User</option>
              <option value="admin">Admin</option>
              <option value="student">Studet</option>
          </Form.Select>

        <Link id="wd-signup-btn"
            to="/Kambaz/Account/Signin"
            className="danger btn btn-danger w-100 mb-2">
            Signout </Link><br />
    </div>
  );
}


/*

import { useNavigate } from "react-router-dom"; // Link, 
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
       const [profile, setProfile] = useState<any>({});
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const { currentUser } = useSelector((state: any) => state.accountReducer);
       const fetchProfile = () => {
              if (!currentUser) return navigate("/Kambaz/Account/Signin");
              setProfile(currentUser);
       };
       const signout = () => {
              dispatch(setCurrentUser(null));
              navigate("/Kambaz/Account/Signin");
       };
       useEffect(() => { fetchProfile(); }, []);

       return (
              <div className="wd-profile-screen">
                     <h3>Profile</h3>
                     {profile && (
                     <div>
                            <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
                                   onChange={(e) => setProfile({ ...profile, username: e.target.value })}/>
                            <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
                                   onChange={(e) => setProfile({ ...profile, password: e.target.value })}/>
                            <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
                                   onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
                            <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
                                   onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}/>
                            <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
                                   onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
                            <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
                                   onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
                            <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                   className="form-control mb-2" id="wd-role">
                                   <option value="USER">User</option> 
                                   <option value="ADMIN">Admin</option>
                                   <option value="FACULTY">Faculty</option> 
                                   <option value="STUDENT">Student</option>
                            </select>
                            <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                                   Sign out
                            </button>
                     </div>
                     )}
              </div>
       );
}

*/