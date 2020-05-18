import React, {useState} from 'react'
import styled from 'styled-components'
import {Link, useLocation} from 'react-router-dom'

import logo from '../assets/logo.png'

const StyledMenu = styled.nav`
    width: 100%;
    height: 90px;
    background-color: ${({theme}) => theme.colors.purple};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;

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

const StyledProfile = styled.div`
    padding: 10px;
    position: relative;
`;

const StyledImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 2px solid white;
`;

const StyledUpdate = styled.div`
    background: ${({theme}) => theme.colors.purple};
    width: 10px;
    height: 10px;
    border-radius: 100%;
    border: 1px solid white;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-8px, 8px);
`;

const MenuItem = ({path, svg, title}) => {
    const location = useLocation();
    const isActive = title.toLowerCase().includes(location.pathname.split('/')[1]) ? true : false;

    return (
        <Link to={path} className={`nav-item${isActive ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d={svg}/>
            </svg>

            <span>{title}</span>
        </Link>
    );
}

const Menu = ({isLoggedIn, menuItems, profile, onClick, update}) => {
    const [isUpdate, setUpdate] = useState(update);

    const handleClick = () => {
        setUpdate(false);
        onClick();
    };

    return (
        isLoggedIn 
        ? (<StyledMenu>
                <StyledLogo src={logo} alt="Navigation Icon" />
                {menuItems.map((item, i) => <MenuItem key={i} path={item.path} svg={item.svg} title={item.title} />)}

                <StyledProfile className="nav-item" onClick={handleClick}>
                    {profile ? <StyledImage src={profile} alt="Profile"/> : ''}
                    <span>Profile</span>
                    {isUpdate ? <StyledUpdate /> : ''}
                </StyledProfile>
            </StyledMenu>) 
        : ''
    );
}

export default Menu;