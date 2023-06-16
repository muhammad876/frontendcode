import { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";
import "./App.css";
import port from "./clientApi";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  ModalFooter,
} from "reactstrap";
function CustomerDashboard(props) {
  const [imageData, setImageData] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [id_, setId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [check, setCheck] = useState(false);
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

  const toggle = () => setModal(!modal);
  const modelButton = () =>{
    setModal(!modal);
    fetch(`${port}/dropin`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id_,
        date : date,
        time : time,
        address : address,
        email : email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(" Added ");
      });
    } 


  const buttonClicked = (id) => {
    setModal(true);
    setId(id);
    let delievery,dropcolor;
    imageData.forEach((element) => {
      if (element._id === id) {
       setEmail(element.email);
        if (element.delievery === "Dropin") {
          element.delievery = "Dropout";
          delievery = "Dropout";
          dropcolor = "btn btn-danger";
          element.dropcolor = "btn btn-danger";
        } else {
             setCheck(true);
             element.delievery = "Dropin";
             delievery = "Dropin";
             dropcolor = "btn btn-success";
             element.dropcolor = "btn btn-success";
        }
      }
    });

      var inventory = {
        id,
        delievery,
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
   
    if(check) {
    var list = {
      id,
    };
    axios
      .post(`${port}/dropout`, list)
      .then((res) => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
  }
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} >Dropin</ModalHeader>
        <ModalBody>
          <input
            type="date"
            className="form-control textBox"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="date"
          />
          <input
            type="time"
            className="form-control textBox"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="time"
          />
          <input
            type="text"
            className="form-control textBox"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" type="submit" onClick={modelButton}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <div className="row">{data}</div>
      </div>
    </div>
  );
}
export default CustomerDashboard;
