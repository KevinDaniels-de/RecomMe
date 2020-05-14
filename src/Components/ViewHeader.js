import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import iconBack from '../assets/back.svg'
import {Link} from 'react-router-dom'

const StyledViewHeader = styled.div`
    background-color: ${({theme}) => theme.colors.purple};
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
`;

const StyledBackBtn = styled.img`
    width: 40px;
    padding: 8px;
`;

const StyledTitle = styled.h5`
    color: white;
    margin: 0 auto;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 4px;
    text-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light};
    ${({goBack}) => goBack === true ? "padding-right: 40px;" : ""};
`;

const ViewHeader = ({title, goBack}) => {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if(!isLogin && title === "login") setLogin(true);
        if(isLogin && (title === "register") || (title !== "register" && title !== "login")) setLogin(false);
    }, [title]);

    return (
        <StyledViewHeader>
            {goBack && !isLogin
                ? <Link to={'/browse'}><StyledBackBtn src={iconBack} alt="Go Back" title="Go Back" /></Link> 
                : ''}
            <StyledTitle goBack={isLogin ? false : goBack}>{title}</StyledTitle>
        </StyledViewHeader>
    );
};

export default ViewHeader;