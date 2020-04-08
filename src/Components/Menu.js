import React from 'react'
import styled from 'styled-components'
import {Link, useLocation} from 'react-router-dom'

const StyledMenu = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 70px;
        text-decoration: none;
        color: black;

        &.active {
            span {
                color: red;
            }

            svg {
                fill: red;
            }
        }
        
        svg {
            width: 36px;
            margin: 0 auto;
        }
    
        span {
            font-family: ${({theme}) => theme.typography.font.headline};
            font-size: 9px;
            text-transform: uppercase;
            width: 100%;
            text-align: center;
        }
    }

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
        height: 100vh;
        width: 170px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 10px;

        .nav-item {
            cursor: pointer;
            height: auto;
            flex-direction: row;
            width: 100%;
            flex: none;
            margin-bottom: 20px;

            &:hover {
                span {
                    color: red;
                }

                svg {
                    fill: red;
                }
            }
            
            svg, span {
                transition: color .2s, fill .2s;
                text-align: left;
                margin: 5px;
            }

            svg {
                width: 50px;
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
            {menuItems.map(item => <MenuItem key={item.id} path={item.path} svg={item.svg} title={item.title} />)}
        </StyledMenu>
    );
}

export default Menu;