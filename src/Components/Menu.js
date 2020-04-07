import React from 'react'
import styled from 'styled-components'

const StyledMenu = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
        height: 100vh;
        width: 170px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 10px;
    }
`;

const StyledMenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 70px;

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

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
        cursor: pointer;
        height: auto;
        flex-direction: row;
        width: 100%;
        flex: none;
        margin-bottom: 20px;
        
        svg, span {
            transition: color .2s, fill .2s;
            text-align: left;
            margin: 5px;
        }

        svg {
            width: 50px;
        }

        &:hover {
            span {
                color: red;
            }

            svg {
                fill: red;
            }
        }
    }
`;

function MenuItem(props) {
    const {path, title} = props;

    return (
        <StyledMenuItem>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d={path}/>
            </svg>

            <span>{title}</span>
        </StyledMenuItem>
    );
}

function Menu(props) {
    const {menuItems} = props;

    return (
        <StyledMenu>
            {menuItems.map(item => <MenuItem key={item.id} path={item.path} title={item.title} />)}
        </StyledMenu>
    );
}

export default Menu;