import React, { useState } from "react";
import iconFacebook from "../assets/icon-facebook.svg"
import iconGoogle from "../assets/icon-google.svg"

function Login(props) {

  return (
    <div>
        <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="E-Mail" />
            <input type="submit" value="Send" />
        </form>
        <img src={iconFacebook} network="facebook" alt="Facebook Login" />
        <img src={iconGoogle} network="google" alt="Facebook Login" />
    </div>
  );
}

export default Login;