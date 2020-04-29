import React from 'react'
import styled from 'styled-components'

import Level from './Level'
import iconRecommendation from '../assets/recommendation.svg'
import iconPeople from '../assets/people.svg'

const StyledProfile = styled.div`
    max-width: 420px;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
    }
`;

const StyledImageOuter = styled.div`
    width: 110px;
    height: 110px;
    padding: 10px;
    border-radius: 100px;
    background: ${({theme}) => theme.colors.blue};
    box-shadow:  5px 5px 5px ${({theme}) => theme.colors.shades.dark}, 
                -2px -2px 5px ${({theme}) => theme.colors.shades.light};
`;

const StyledImageInner = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: 50% 50%;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark};
`;

const StyledInfoContainer = styled.div`
    color: ${({theme}) => theme.colors.white};
    padding: 15px;
    max-width: 210px;
    width: 100%;
`;

const StyledActivityContainer = styled.div``;

const StyledActivityItem = styled.div`
    width: 40px;
    height: 40px;
    background: ${({theme}) => theme.colors.blue};
    border-radius: 100%;
    margin: 10px;
    position: relative;

    span {
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        transform: translate(-100%, -50%);
        color: white;
        background: rgba(0, 0, 0, 0.75);
        padding: 4px 10px;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
    }

    &.recommendation {
        background-image: url(${iconRecommendation});
        background-position: 50% 50%;
        background-size: 50%;
        background-repeat: no-repeat;
    }

    &.people {
        background-image: url(${iconPeople});
        background-position: 50% 50%;
        background-size: 55%;
        background-repeat: no-repeat;
    }
`;

function Profile(props) {
    const {name, image, experience, multiplicator, recommendations, peopleMet} = props;

    return (
        <StyledProfile>
            <StyledImageOuter>
                <StyledImageInner src={image}/>
            </StyledImageOuter>
            <StyledInfoContainer>
                <h5>{name}</h5>
                <Level experience={experience} multiplicator={multiplicator} />
            </StyledInfoContainer>
            <StyledActivityContainer>
                <StyledActivityItem className="recommendation">
                    <span>{recommendations} Recommendations</span>
                </StyledActivityItem>
                <StyledActivityItem className="people">
                    <span>Met {peopleMet} People</span>
                </StyledActivityItem>
            </StyledActivityContainer>
        </StyledProfile>
    )
}

export default Profile;