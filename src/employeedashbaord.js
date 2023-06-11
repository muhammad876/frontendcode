import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Employeeheader from "./Employeeheader";
import "./App.css";
import axios from "axios";
function EmployeeDashboard() {
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://mern-api-ten.vercel.app/getImage");
        const data = await response.json();
        console.log(data.image);
        setImageData(data.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);
  const buttonClicked = (id) => {
    var base64, code, status, name, delievery, statuscolor, dropcolor;
    imageData.forEach((element) => {
      if (element._id === id) {
        name = element.name;
        base64 = element.image;
        code = element.code;
        delievery = element.delievery;
        dropcolor = element.dropcolor;
        if (element.status === "stored") {
          status = "en route";
          statuscolor = "btn btn-warning";
          element.statuscolor = "btn btn-warning";
          element.status = "en route";
        } else if (element.status === "en route") {
          status = "returned";
          statuscolor = "btn btn-success";
          element.statuscolor = "btn btn-success";
          element.status = "returned";
        } else {
          status = "stored";
          statuscolor = "btn btn-primary";
          element.statuscolor = "btn btn-primary";
          element.status = "stored";
        }
      }
    });
    var inventory = {
      id,
      base64,
      code,
      status,
      name,
      delievery,
      statuscolor,
      dropcolor,
    };
    axios
      .post("https://mern-api-ten.vercel.app/update", inventory)
      .then((res) => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
  };
  const data = imageData.map((data, index) => {
    return (
      <div className="col-sm-4 cardbottom" key={data._id}>
        <div className="card">
          <img
            className="card-img-top"
            src={data.image}
            alt="Card image"
            width="90%"
            height="400px"
          />

          <div className="card-img-overlay">
            <button
              className={data.statuscolor}
              onClick={buttonClicked.bind(this, data._id)}
            >
              {data.status}
            </button>
          </div>
          <div className="card-header">
            <h4 className="card-title">{data.name}</h4>
            <p className="text-danger">{data.code}</p>
            <p className="text-success">
              <span>Delievery: </span>
              {data.delievery}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Employeeheader></Employeeheader>
      <div className="container">
        <div className="row">{data}</div>
      </div>
    </div>
  );
}
export default EmployeeDashboard;
