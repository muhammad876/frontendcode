import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "./firebase";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from './images/logo.png';
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
     alert("Customer");
     registerWithEmailAndPassword("Customer", email, password);
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