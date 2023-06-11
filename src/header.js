import React, { Component } from "react";
import "./Styles/header.css";
import logo from "./images/logo.png";
import Menu from "./images/menu.png";
import { logout } from "./firebase";
import axios from "axios";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

function Header() {
  async function handletoken(token, address) {
    const response = await axios.post("https://reacttestapp.vercel.app/checkout", {
      token,
      product,
    });
    console.log(response.data);
    if (response.status === 200) {
      toast("Payment Completed Successfully", { type: "success" });
    } else {
      toast("Failure, error occur during payment", { type: "success" });
    }
  }
  const [product] = useState({
    name: "Ijaz",
    price: 200,
    des: "ssssssssssssss",
  });
  function menutoggler() {
    var id_ = document.getElementById("menu_items");
    id_.style.maxHeight = "0px";
    if (id_.style.maxHeight == "0px") {
      id_.style.maxHeight = "600px";
    } else {
      id_.style.maxHeight = "0px";
    }
  }

  // const Payment = () => {
  //                axios.post("http://localhost:3001/stripe").then((res) => {
  //                 if(res.data.url){
  //                     window.location.href = res.data.url;
  //                 }
  //                }).catch((error) => {
  //                 console.log(error);
  //                })
  // }
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} width="120px;" />
        </div>
        <nav>
          <ul id="menu_items">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a>
                <StripeCheckout
             
                  stripeKey="pk_test_51NFVMtSBa1DPoKnkdVhJrWgN2xji5tkUF1640T7gfuygoeFck55zcxzpuVnp4FSLF6HkPmJwDCE3uHrASxPoY1tV00NQ6MLvV7"
                  name={product.name}
                  amount={product.price}
                  token={handletoken}
                  billingAddress
                  shippingAddress
                >Payment</StripeCheckout>
              </a>
            </li>
            <li>
              <a href="/">
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </a>
            </li>
          </ul>
        </nav>
        <img src={Menu} className="menu"  />
      </div>
      {/* <Navigations></Navigations> */}
    </div>
  );
}

export default Header;
