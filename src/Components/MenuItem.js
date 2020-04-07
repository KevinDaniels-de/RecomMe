import React from 'react'
import styled from 'styled-components'

const StyledMenuItem = styled.div`
    display: flex;
    align-items: center;
    flex-direction: space-around;
    flex: 1;
    height: 100%;
`;

function MenuItem() {
    return (
        <StyledMenuItem>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d="M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z"/>
            </svg>

            <span>Dashboard</span>
        </StyledMenuItem>
    );
}

export default MenuItem;