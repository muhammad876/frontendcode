import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="body">
      <div className="container">
                <div className="plogo">
                    <img src={logo} width="120px;" />
                </div>
              <div className="row login">
                <div className="col-md-4">
                <h1>Login</h1>
                    <div className="form-group">
                        <input type="email"   className="form-control textBox"  value={email}   onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-mail Address" />
                        <input type="password"className="form-control textBox"   value={password}  onChange={(e) => setPassword(e.target.value)}  
                        placeholder="Password"   />
                        <button className="btn btn-primary btnstyle"  onClick={() => signInWithEmailAndPassword(auth,email, password)}> Login </button>
                        <div> <Link className="btn btn-success btnstyle" to="/register"> Don't have an account?  Register</Link> </div>
                      </div>
                    </div>
            </div>
      </div>
    </div>

   
  );
}
export default Login;