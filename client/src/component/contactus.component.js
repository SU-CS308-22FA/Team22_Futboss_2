import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { userContext } from "../store/context";
import "../style/loginpage.css";

export function Contactus() {
    window.scrollTo(0, 0);
    return (
        <div>
          <div className="login">
            <h1>CONTACT US!</h1>
            <h1>phone: 
                +90 532 201 3536</h1>
                <h1>   support email:
                futboss@gmail.com</h1>
                <h1> Headquartes: Orta Mahalle, Üniversite Caddesi</h1>
                <h1> No:27 Tuzla, 34956 İstanbul</h1>
        </div>
        </div>)
}