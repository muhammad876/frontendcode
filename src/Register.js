import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from './images/logo.png';
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
     registerWithEmailAndPassword(name, email, password);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard");
  }, [user, loading]);
  return (
    <div className="body">
    <div className="container">
                <div className="plogo">
                    <img src={logo} width="120px;" />
                </div>
            <div className="row login">
              <div className="col-md-4">
                <h1>Registration</h1>
                  <div className="form-group">
                  
                    <input
                      type="email"
                      className="form-control textBox"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail Address"
                    />
                    <input
                      type="password"
                      className="form-control textBox"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />  
                      <select name="role"  value={name} onChange={handleChange} className="btn btn-warning form-control textBox">
                      <option value= "Employee" >Employee</option>
                      <option value="Customer" >Customer</option>
                    </select>
                    <button className="btn btn-primary btnstyle" onClick={register}>
                      Register
                    </button>
                    <div>  <Link className="btn btn-success btnstyle" to="/">Already have an account? Login</Link>
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Register;