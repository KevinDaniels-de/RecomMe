import React from 'react'
import styled from 'styled-components'

const StyledActivity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
    }
`;



function Activity(props) {
    const {recommendations, peopleMet} = props;

    return (
        <StyledActivity>
            <span>{recommendations ? `${recommendations} Recommendations` : `${peopleMet} People met`}</span>
        </StyledActivity>
    )
}

export default Activity;