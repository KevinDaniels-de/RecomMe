import React, {useState} from "react"
import styled from 'styled-components'
import {useForm} from 'react-hook-form';

import * as yup from 'yup';

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

    input[type="file"] {
        display: none;
    }
`;

const StyledErrorLabel = styled.label`
    color: red;
    font-weight: bold;
`;

const StyledProfile = styled.div`
    position: relative;
    width: 130px;
    height: 130px;
    background: ${({theme}) => theme.colors.royal};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 100%;
    padding: 10px;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 1px;
    color: ${({theme}) => theme.colors.white};
    cursor: pointer;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        padding: 5px;
    }
`;

function Register(props) {
    const {createEmailUser} = props;

    const [profileImage, setProfileImage] = useState(null);

    const mailingListSchema = yup.object().shape({
        username: yup.string().required('username is required').min(5, 'username must be a a longer than five characters'),
        email: yup.string().email('e-mail is not valid').required('you must enter a e-mail'),
        password: yup.string().required('password is required').min(2, 'password must be a a longer than two characters')
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
        <StyledRegisterContainer>
            <StyledHeadline>Register</StyledHeadline>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledProfile onClick={() => document.querySelector('input[type="file"]').click()}>
                    {profileImage === null ? "Upload Profile Image" : <img src={profileImage} />}
                </StyledProfile>
                <input type="file" name="image" placeholder="Upload Image" onChange={e => showProfile(e.target.files[0])} ref={register} />

                <input type="text" name="username" placeholder="Username" ref={register} />
                <StyledErrorLabel>{errors.username && errors.username.message}</StyledErrorLabel>

                <input type="text" name="email" placeholder="E-Mail" ref={register} />
                <StyledErrorLabel>{errors.email && errors.email.message}</StyledErrorLabel>

                <input type="text" name="password" placeholder="Password" ref={register} />
                <StyledErrorLabel>{errors.password && errors.password.message}</StyledErrorLabel>

                <input type="submit" value="Send" />
            </StyledForm>
        </StyledRegisterContainer>
    );
}

export default Register;