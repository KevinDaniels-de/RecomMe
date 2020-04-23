import React, { useState } from "react"
import styled from 'styled-components'
import iconFacebook from "../assets/icon-facebook.svg"
import iconGoogle from "../assets/icon-google.svg"
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import useAuth from "../services/firebase/useAuth";

import firebase from "firebase/app"; // the firbase core lib
import "firebase/auth"; // specific products
import "firebase/firestore";
import firebaseConfig from "../config/firebase"; // the firebase config we set up ealier



function Login(props) {
  const StyledLoginContainer = styled.section`
  `;

  const StyledHeadline = styled.h1`
    color: ${({theme}) => theme.colors.white};
    background: linear-gradient(145deg, ${({theme}) => theme.colors.blue}, ${({theme}) => theme.colors.royal});
    padding: 20px 20px 40px 20px;
    margin: 0;
    line-height: 140%;
  `;

  const StyledForm = styled.form`
    background: ${({theme}) => theme.colors.white};
    border-radius: 20px 20px 0 0;
    padding: 20px;
    margin: -20px 0 -85px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input[type="text"] {
        font-family: inherit;
        font-size: 2rem;
        padding: 10px;
        border: none;
        background: ${({theme}) => theme.colors.white};
        box-shadow: 3px 3px 10px ${({theme}) => theme.colors.shades.dark};
        margin: 0 auto 20px auto;
        max-width: 260px;
        width: 100%;
        display: block;
    }

    input[type="submit"] {
        border: none;
        background: ${({theme}) => theme.colors.royal};
        color: white;
        font-family: inherit;
        text-transform: uppercase;
        letter-spacing: 10px;
        font-size: 1.3rem;
        padding: 20px 40px;
        border-radius: 5px;
        margin-bottom: 30px;
    }

    a {
        color: black;
        font-weight: 700;
        margin-top: 20px;
    }
  `;

  const StyledSocial = styled.div`
    img {
        background: ${({theme}) => theme.colors.blue};
        border-radius: 100%;
        width: 80px;
        height: 80px;
        object-fit: contain;
        object-position: 50% 50%;
        padding: 20px;
        display: inline-block;
        margin: 20px 10px;
    }
  `;

    const StyledErrorLabel = styled.label`
        color:red;
        font-weight: bolder;
        margin: 1% 0 4% 0;
    `;

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }

    const mailingListSchema = yup.object().shape({
        email: yup.string().email('email is not valid').required('you must enter a email'),
        password: yup.string().required('password is required').min(2, 'name must be a a longer than two letters')
    });

    const {
        signInEmailUser,
        signInWithProvider
      } = useAuth(firebase.auth);

    const { register, handleSubmit,  errors } = useForm({ validationSchema:mailingListSchema});
    const onSubmit = async data => {
        const { email, password } = data;

        console.log(data);
        
    
        try {
          const user = await signInEmailUser(email, password);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <StyledLoginContainer>
      <StyledHeadline>Login</StyledHeadline>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="email" placeholder="E-Mail" ref={register} />
            <StyledErrorLabel> {errors.email && errors.email.message} </StyledErrorLabel>

            <input type="text" name="password" placeholder="Password" ref={register} />
            <StyledErrorLabel> {errors.password && errors.password.message} </StyledErrorLabel>

            <input type="submit" value="Send" />
            <StyledSocial>
                <img src={iconFacebook} network="facebook" alt="Facebook Login" />
                <img src={iconGoogle} network="google" alt="Google Login" />
            </StyledSocial>
            <Link to={'/register'}>New? Register</Link>
        </StyledForm>
    </StyledLoginContainer>
  );
}

export default Login;