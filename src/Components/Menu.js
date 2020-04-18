import React from 'react'
import styled from 'styled-components'
import {Link, useLocation} from 'react-router-dom'

import logo from "../assets/logo.png";

const StyledMenu = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: ${({theme}) => theme.colors.white};

    img {
        display: none;
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 65px;
        height: 65px;
        text-decoration: none;
        border-radius: 100px;
        margin: 10px;
        color: ${({theme}) => theme.colors.white};

        &.active {
            background: ${({theme}) => theme.colors.white};
            box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, 
                        inset -5px -5px 10px ${({theme}) => theme.colors.shades.light};

            svg {
                fill: ${({theme}) => theme.colors.blue};
            }
        }
        
        svg {
            width: 36px;
            margin: 0 auto;
            fill: ${({theme}) => theme.colors.shades.black};
        }
    
        span {
            display: none;
        }
    }

    ${({theme}) => theme.mediaQueries.tablet} {
        justify-content: center;
    }

    ${({theme}) => theme.mediaQueries.desktop} {
        width: 250px;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
        background: ${({theme}) => theme.colors.white};

        img {
            display: block;
            width: 90%;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translate(-50%, 0%);
        }

        .nav-item {
            width: 100%;
            height: auto;
            padding: 10px 20px;
            flex-direction: row;
            justify-content: flex-start;
            margin: 10px 0;
            transition: all .2s;

            &.active, &:hover {
                background-color: ${({theme}) => theme.colors.white};
                box-shadow: inset 7px 7px 14px ${({theme}) => theme.colors.shades.dark}, 
                            inset -7px -7px 14px ${({theme}) => theme.colors.white};

                svg {
                    fill: ${({theme}) => theme.colors.blue};
                }

                span {
                    color: ${({theme}) => theme.colors.blue};
                }
            }

            svg {
                width: 60px;
                margin: 0 10px 0 0;
                fill: ${({theme}) => theme.colors.black};
            }

            span {
                width: auto;
                font-size: 1.6rem;
                color: ${({theme}) => theme.colors.black};
                font-weight: 700;
            }
        }
    }
`;

function MenuItem(props) {
    const {path, svg, title} = props;
    const location = useLocation();
    const isActive = location.pathname.split('/')[1] === title.toLowerCase() ? true : false;

    return (
        <Link to={path} className={`nav-item${isActive ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d={svg}/>
            </svg>

            <span>{title}</span>
        </Link>
    );
}

function Menu(props) {
    const {menuItems} = props;

    return (
        <StyledMenu>
            <img src={logo} />
            {menuItems.map(item => <MenuItem key={item.id} path={item.path} svg={item.svg} title={item.title} />)}
        </StyledMenu>
    );
}

export default Menu;