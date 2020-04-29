import React from 'react'
import styled from 'styled-components'
import spinner from '../assets/spinner.svg'


function Loader() {
    const StyledLoaderContainer = styled.section`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
    `;
    
    const StyledLoader = styled.img`
        max-width: 300px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

    return (
        <StyledLoaderContainer>
            <StyledLoader src={spinner} />
        </StyledLoaderContainer>
    );
}

export default Loader;