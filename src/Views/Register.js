import React, {useState} from "react"
import styled from 'styled-components'
import {useForm} from 'react-hook-form';

import * as yup from 'yup';

const StyledRegister = styled.section`
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
        margin: 40px auto 0 auto;
        text-decoration: none;
        border: 1px solid ${({theme}) => theme.colors.purple};
        border-radius: 30px;
        padding: 5px 20px;
        color: ${({theme}) => theme.colors.purple};
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 3px;
    }
`;

const StyledProfile = styled.div`
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    padding: 5px;
    font-size: 1rem;
    line-height: 125%;
    font-weight: 700;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 20px auto;
    background: ${({theme}) => theme.colors.purple};
    box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, inset -5px -5px 10px ${({theme}) => theme.colors.shades.light}, 
                3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};

    &::after {
        content: "+";
        position: absolute;
        bottom: 0;
        right: 0;
        background: purple;
        color: ${({theme}) => theme.colors.white};
        font-size: 2rem;
        border-radius: 100%;
        padding: 5px;
        line-height: 9px;
    }

    &.empty {
        background: ${({theme}) => theme.colors.white};
    }

    img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }

    input {
        display: none;
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

const StyledError = styled.label`
    color: red;
    font-weight: bold;
    font-style: oblique;
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
    margin-top: 20px;
    color: ${({theme}) => theme.colors.white};
    box-shadow: 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, -3px -3px 7px ${({theme}) => theme.colors.shades.light};
`;

const Register = ({createEmailUser}) => {
    const [profileImage, setProfileImage] = useState(null);

    const mailingListSchema = yup.object().shape({
        username: yup.string().required('A username is required').min(5, 'The username must be a a longer than five characters'),
        email: yup.string().email('The mail is not valid').required('You must enter a mail'),
        password: yup.string().required('A password is required').min(2, 'The password must be a a longer than two characters')
    });

    const {register, handleSubmit, errors} = useForm({validationSchema:mailingListSchema});

    const onSubmit = async data => {
        const {email, password, username, image} = data;        
        createEmailUser(email, password, username, image);
    };

    const showProfile = (file) => {
        if(file) setProfileImage(URL.createObjectURL(file));
    };

    return (
        <StyledRegister>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledProfile className={profileImage === null ? "empty" : ""} onClick={() => document.querySelector('input[type="file"]').click()}>
                    {profileImage === null ? "Upload Profile Image" : <img src={profileImage} alt="Profile" />}
                    <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={e => showProfile(e.target.files[0])} ref={register} />
                </StyledProfile>

                <StyledLabel>
                    <span>Username</span>
                    <input type="text" name="username" placeholder="Enter username..." ref={register} />
                    <StyledError>{errors.username && errors.username.message}</StyledError>
                </StyledLabel>

                <StyledLabel>
                    <span>Mail</span>
                    <input type="text" name="email" placeholder="Enter mail..." ref={register} />
                    <StyledError>{errors.email && errors.email.message}</StyledError>
                </StyledLabel>

                <StyledLabel>
                    <span>Password</span>
                    <input type="password" name="password" placeholder="Enter passsword..." ref={register} />
                    <StyledError>{errors.password && errors.password.message}</StyledError>
                </StyledLabel>

                <StyledSubmit type="submit" value="Register" />
            </StyledForm>
        </StyledRegister>
    );
}

export default Register;