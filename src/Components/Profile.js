import React from 'react'
import styled from 'styled-components'

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

const StyledBarOuter = styled.div`
    margin: 10px 0 3px 0;
    padding: 5px 7px;
    border-radius: 20px;
    background: ${({theme}) => theme.colors.blue};
    box-shadow: inset 7px 7px 7px ${({theme}) => theme.colors.shades.dark}, 
                inset -7px -7px 7px ${({theme}) => theme.colors.shades.light};
`;

const StyledBarInner = styled.div`
    background: ${({theme}) => theme.colors.white};
    width: ${props => props.percentage}%;
    height: 10px;
    border-radius: 20px;
`;

const StyledLevel = styled.div`
    font-size: 3.5rem;
    text-transform: uppercase;
    letter-spacing: 6px;
    text-align: right;

    span {
        font-size: 25%;
    }

    b {
        transform: rotate(-16deg);
        letter-spacing: 0px;
        display: inline-block;
    }
`;

const StyledActivityContainer = styled.div`

`;

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

const getLevel = (exp, bonus) => {
    let levelFormula = bonus * .75 * Math.sqrt(exp);

    return {
        level: Math.floor(levelFormula),
        percentage: Math.floor((levelFormula - Math.floor(levelFormula)) * 100)
    };
}

function Profile(props) {
    const {name, image, experience, recommendations, peopleMet} = props;
    const {level, percentage} = getLevel(experience, 1);

    return (
        <StyledProfile>
            <StyledImageOuter>
                <StyledImageInner src={image}/>
            </StyledImageOuter>
            <StyledInfoContainer>
                <h5>{name}</h5>
                <StyledBarOuter>
                    <StyledBarInner percentage={percentage} />
                </StyledBarOuter>
                <StyledLevel>
                    <span>Lv</span><b>{level}</b>
                </StyledLevel>
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