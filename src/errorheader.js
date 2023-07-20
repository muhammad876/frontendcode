
import  React,{ Component } from "react";
import './Styles/header.css';
import logo from './images/logo.png';
import Menu from './images/menu.png';
import { logout } from "./firebase";

class Errorheader extends Component {
    constructor(props) {
        super(props);
        this.menutoggler = this.menutoggler.bind(this);
    }
   
     menutoggler(){
        var id_=document.getElementById("menu_items");
        id_.style.maxHeight="0px";
            if(id_.style.maxHeight=="0px"){
                id_.style.maxHeight="600px";
            }
            else{
                id_.style.maxHeight="0px";
            }
    }
    render() { 
        return (   
       <div className="container">
            <div className="navbar">
                <div className="logo">
                    <img src={logo} width="120px;" />
                </div>  
                <nav>
                    
                        <ul id="menu_items">
                           <li><a href="/"><button className="btn btn-primary" onClick={logout}>Back to Login</button></a></li>
                        </ul>
                </nav>
               <img src={Menu} className="menu" onClick={this.menutoggler} />
              
            </div>
           
        </div>
    );

    }
}
 
export default Errorheader;