

import React, {  useState} from "react";
import {useNavigate} from 'react-router-dom';
import Employeeheader from "./Employeeheader";
import port from "./clientApi";
import axios from "axios";



function AddList() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [email, setEmail] = useState("");

  function additem(e) {

    var inventory = {
      base64: file,
      code : generateString(8),
      status : "stored",
      name : name,
      email : email
    };
    axios
      .post(`${port}/add`, inventory)
      .then((res) => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
    // fetch(`${port}/add`, {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Accept-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     base64: file,
    //     code : generateString(8),
    //     status : "stored",
    //     name : name,
    //     email : email
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //    alert("Added");
     
    //   });
      navigate("/dashboard");

  }
  function generateString(length) {
    const result = Math.random().toString(36).substring(2, length + 2)
    return result;
}
  function Imagepath(e) {
    console.log("Image Path Working");
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error ", error);
    };
  }

  return (
    <div className="body">
      <Employeeheader></Employeeheader>
      <div className="container">
        <div className="row login">
          <div className="col-md-4">
            <h1>Add Item </h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control textBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
              />
               <input
                type="text"
                className="form-control textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer email_id_registered"
              />
              <input
                type="file"
                className="form-control textBox"
                onChange={Imagepath}
                placeholder="Choose Image"
              />
              <button className="btn btn-primary btnstyle" onClick={additem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default AddList;
