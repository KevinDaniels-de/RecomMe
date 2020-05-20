import React from "react"
import styled from 'styled-components'
import iconFacebook from "../assets/icon-facebook.svg"
import iconGoogle from "../assets/icon-google.svg"
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'

const StyledLogin = styled.section`
    position: relative;
    margin: 0 auto;
    width: 90%;
    height: calc(100vh - 70px);
    overflow-y: auto;
`;

const StyledForm = styled.form`
    background: ${({theme}) => theme.colors.white};
    border-radius: 20px;
    padding: 30px;
    box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, inset -5px -5px 10px ${({theme}) => theme.colors.shades.light}, 
                3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
    position: relative;
    max-width: 360px;
    width: 90%;
    margin: 0 auto;

    .register {
        font-weight: 700;
        display: block;
        text-align: center;
        margin: 30px auto 0 auto;
        text-decoration: none;
        border: 1px solid ${({theme}) => theme.colors.purple};
        border-radius: 30px;
        padding: 5px 20px;
        color: ${({theme}) => theme.colors.purple};
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: 3px;
    }
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    span {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 1.1rem;
        letter-spacing: 3px;
        margin-left: 20px;
        font-family: ${({theme}) => theme.typography.font.headline};
    }

    input {
        width: 100%;
        border: none;
        outline: 0;
        padding: 17px;
        border-radius: 60px;
        font-family: inherit;
        font-weight: 700;
        font-size: 1.6rem;
        box-shadow: 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
    }
`;

const StyledSubmit = styled.input`
    border: none;
    background: ${({theme}) => theme.colors.purple};
    width: 100%;
    padding: 20px;
    font-weight: 700;
    font-family: inherit;
    text-transform: uppercase;
    letter-spacing: 5px;
    border-radius: 30px;
    margin: 20px 0 30px 0;
    color: ${({theme}) => theme.colors.white};
    box-shadow: 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
    cursor: pointer;
`;

const StyledError = styled.b`
    color: red;
    font-weight: bold;
    font-style: oblique;
`;

const StyledOneClick = styled.h6`
    text-align: center;
    text-shadow: 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
    border-top: 1px solid ${({theme}) => theme.colors.shades.dark};
    padding-top: 30px;
`;

const StyledSocial = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
`;

const StyledSocialIcon = styled.img`
    width: 60px;
    padding: 15px;
    background: ${({theme}) => theme.colors.purple};
    border-radius: 100%;
    margin: 0 10px;
    box-shadow: 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
    cursor: pointer;

    &.icon-fb {
        background: #3b5998;
    }

    &.icon-google {
        background: #DB4437;
    }
`;

const Login = ({signInEmailUser, signInWithProvider}) => {
    const mailingListSchema = yup.object().shape({
        email: yup.string().email('The mail is not valid').required('You must enter a mail'),
        password: yup.string().required('A password is required').min(2, 'The password must be a a longer than two characters')
    });

    const {register, handleSubmit,  errors} = useForm({validationSchema:mailingListSchema});

    const onSubmit = async ({email, password}) => {
        try {
            const user = await signInEmailUser(email, password);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSocialClick = provider => signInWithProvider(provider);

    return (
        <StyledLogin>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledLabel>
                    <span>Mail</span>
                    <input type="text" name="email" placeholder="Enter mail..." ref={register} />
                    <StyledError>{errors.email && errors.email.message}</StyledError>
                </StyledLabel>

                <StyledLabel>
                    <span>Password</span>
                    <input type="password" name="password" placeholder="Enter password..." ref={register} />
                    <StyledError>{errors.password && errors.password.message}</StyledError>
                </StyledLabel>

                <StyledSubmit type="submit" value="Send" />

                <StyledOneClick>Use One-Click</StyledOneClick>
                <StyledSocial>
                    <StyledSocialIcon src={iconFacebook} className="icon-fb" network="facebook" alt="Facebook Login" onClick={() => handleSocialClick("facebook")} />
                    <StyledSocialIcon src={iconGoogle} className="icon-google" network="google" alt="Google Login" onClick={() => handleSocialClick("google")} />
                </StyledSocial>

                <Link to={'/register'} className="register">New? Register</Link>
            </StyledForm>
        </StyledLogin>
    )
}

export default Login;