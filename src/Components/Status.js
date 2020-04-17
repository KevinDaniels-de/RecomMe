import React from 'react'
import styled from 'styled-components'

import Profile from './Profile'

const StyledStatus = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
    }
`;



function Status(props) {
    const {name, image, experience} = props;

    return (
        <StyledStatus>
            <Profile name={name} image={image} experience={experience} />
        </StyledStatus>
    )
}

export default Status;