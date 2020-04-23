import React, { useState } from "react"
import styled from 'styled-components'
import {Link} from 'react-router-dom'

function Register(props) {
  const StyledRegisterContainer = styled.section``;

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
  `;

  return (
    <StyledRegisterContainer>
      <StyledHeadline>Register</StyledHeadline>
        <StyledForm>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="E-Mail" />
            <input type="submit" value="Send" />
        </StyledForm>
    </StyledRegisterContainer>
  );
}

export default Register;