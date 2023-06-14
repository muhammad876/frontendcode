import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import axios from "axios";
import "./App.css";
import port from "./clientApi";
import { useSendSignInLinkToEmail } from "react-firebase-hooks/auth";
function CustomerDashboard(props) {
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    let email = props.email;
    const fetchImages = async () => {

        try {
            const response = await axios.get(`${port}/getCustomerData/${email}`);
            console.log(response.data);
            setImageData(response.data.image);
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
        status = element.status;
        statuscolor = element.statuscolor;

        if (element.delievery === "not yet") {
          element.delievery = "Dropin";
          delievery = "Dropin";
          dropcolor = "btn btn-success";
          element.dropcolor = "btn btn-success";
        } else {
          element.delievery = "Dropout";
          delievery = "Dropout";
          dropcolor = "btn btn-danger";
          element.dropcolor = "btn btn-danger";
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
      .post(`${port}/update`, inventory)
      .then((res) => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
    console.log(id);
  };

  // function generateString(length) {
  //   const result = Math.random()
  //     .toString(36)
  //     .substring(2, length + 2);
  //   return result;
  // }
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
              className={data.dropcolor}
              onClick={buttonClicked.bind(this, data._id)}
            >
              {data.delievery}
            </button>
          </div>
          <div className="card-header">
            <h4 className="card-title">{data.name}</h4>
            <p className="text-danger">{data.code}</p>
            <p className="text-primary">
              <span>Item status: </span>
              {data.status}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (

    <div>
      <Header></Header>
      <div className="container">
        <div className="row">{data}</div>
      </div>
    </div>
  );
}
export default CustomerDashboard;
