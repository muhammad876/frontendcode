import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { auth, db} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import CustomerDashboard from "./customerdashbaord";
import EmployeeDashboard from "./employeedashbaord";
function Dashbaord() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setEmail(data.email);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  if (name === "Employee" || name === "employee") {
    return (
      <div>
     
        <EmployeeDashboard></EmployeeDashboard>
      </div>
    );
  } else if (name === "Customer" || name === "customer") {
    return (
      <div>
        <CustomerDashboard email = {email}></CustomerDashboard>
      </div>
    );
  }
}

export default Dashbaord;
