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
    box-shadow: 0px -10px 5px ${({theme}) => theme.colors.blue.dark};
    background: ${({theme}) => theme.colors.blue.dark};

    img {
        display: none;
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 85px;
        height: 85px;
        text-decoration: none;
        border-radius: 100px;
        margin: 10px;
        color: ${({theme}) => theme.colors.black[0]};

        &.active {
            background: ${({theme}) => theme.colors.blue.full};
            box-shadow: inset 5px 5px 12px ${({theme}) => theme.colors.blue.dark}, 
                        inset -5px -5px 12px ${({theme}) => theme.colors.blue.light};

            span {
                color: ${({theme}) => theme.colors.yellow.full};
            }

            svg {
                fill: ${({theme}) => theme.colors.yellow.full};
            }
        }
        
        svg {
            width: 36px;
            margin: 0 auto;
            fill: ${({theme}) => theme.colors.black[0]};
        }
    
        span {
            font-family: ${({theme}) => theme.typography.font.text};
            font-size: .7rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            width: 100%;
            text-align: center;
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
        background: ${({theme}) => theme.colors.black[0]};

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
                background-color: ${({theme}) => theme.colors.black[0]};
                box-shadow: inset 7px 7px 14px ${({theme}) => theme.colors.black[25]}, 
                            inset -7px -7px 14px ${({theme}) => theme.colors.black[0]};

                svg {
                    fill: ${({theme}) => theme.colors.yellow.full};
                }

                span {
                    color: ${({theme}) => theme.colors.yellow.full};
                }
            }

            svg {
                width: 60px;
                margin: 0 10px 0 0;
                fill: ${({theme}) => theme.colors.black[100]};
            }

            span {
                width: auto;
                font-size: 1.6rem;
                color: ${({theme}) => theme.colors.black[100]};
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