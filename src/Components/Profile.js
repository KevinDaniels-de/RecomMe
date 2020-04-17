import React from 'react'
import styled from 'styled-components'

const StyledProfile = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
    }
`;

const StyledImageOuter = styled.div`
    width: 150px;
    height: 150px;
    margin: 15px;
    padding: 15px;
    border-radius: 100px;
    background: ${({theme}) => theme.colors.blue.full};
    box-shadow: inset 7px 7px 7px ${({theme}) => theme.colors.blue.dark}, 
                inset -7px -7px 7px ${({theme}) => theme.colors.blue.light};
`;

const StyledImageInner = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: 50% 50%;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.blue.dark};
`;

const StyledInfoContainer = styled.div`
    padding: 20px 20px 20px 0;
`;

const StyledBarOuter = styled.div`
    margin: 10px 0 3px 0;
    padding: 5px 7px;
    border-radius: 20px;
    background: ${({theme}) => theme.colors.blue.full};
    box-shadow: inset 7px 7px 7px ${({theme}) => theme.colors.blue.dark}, 
                inset -7px -7px 7px ${({theme}) => theme.colors.blue.light};
`;

const StyledBarInner = styled.div`
    background: ${({theme}) => theme.colors.yellow.full};
    width: ${props => props.percentage}%;
    height: 10px;
    border-radius: 20px;
`;

const StyledLevel = styled.div`
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 6px;
    text-align: right;

    span {
        font-size: 50%;
    }
`;

function Profile(props) {
    const {name, image, experience} = props;
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
        </StyledProfile>
    )
}

export default Profile;

function getLevel(exp, bonus) {
    let levelFormula = bonus * .75 * Math.sqrt(exp);

    return {
        level: Math.floor(levelFormula),
        percentage: Math.floor((levelFormula - Math.floor(levelFormula)) * 100)
    };
}