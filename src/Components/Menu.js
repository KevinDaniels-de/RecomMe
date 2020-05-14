import React from 'react'
import styled from 'styled-components'
import {Link, useLocation} from 'react-router-dom'

import logo from "../assets/logo.png";

const StyledMenu = styled.nav`
    width: 100%;
    height: 90px;
    background-color: ${({theme}) => theme.colors.purple};
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-item {
        margin: 0 5px;
        line-height: 0;
        cursor: pointer;

        svg {
            fill: ${({theme}) => theme.colors.white};
            width: 50px;
            height: 50px;
            padding: 10px;
        }

        span {
            display: none;
        }

        &.active {
            svg {
                fill: ${({theme}) => theme.colors.purple};
                background-color: ${({theme}) => theme.colors.white};
                border-radius: 100%;
                box-shadow: 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, -5px -5px 10px ${({theme}) => theme.colors.shades.light};
            }
        }
    }
`;

const StyledLogo = styled.img`
    display: none;
`;

const MenuItem = ({signOut, path, svg, title}) => {
    const location = useLocation();
    const isActive = title.toLowerCase().includes(location.pathname.split('/')[1]) ? true : false;

    const handleClick = () => path === "/logout" ? signOut(path) : '';

    return (
        <Link to={path} className={`nav-item${isActive ? " active" : ""}`} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d={svg}/>
            </svg>

            <span>{title}</span>
        </Link>
    );
}

const Menu = ({signOut, isLoggedIn, menuItems}) => {
    return (
        isLoggedIn 
        ? (<StyledMenu>
                <StyledLogo src={logo} alt="Navigation Icon" />
                {menuItems.map((item, i) => <MenuItem key={i} path={item.path} svg={item.svg} title={item.title} signOut={signOut} />)}
            </StyledMenu>) 
        : ''
    );
}

export default Menu;