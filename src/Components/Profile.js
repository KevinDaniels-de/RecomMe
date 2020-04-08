import React from 'react'
import styled from 'styled-components'

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-item: flex-start;
    justify-content: flex-start;
    width: 150px;

    ${({theme}) => theme.mediaQueries.tablet} {
    }

    ${({theme}) => theme.mediaQueries.desktop} {
    }
`;

const StyledImage = styled.div`
    width: 130px;
    height: 130px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 100%;
`;

const StyledBar = styled.div`
    width: 100%;
    margin-top: -20px;
`;

const StyledBarOuter = styled.div`
    width: 100%;
    height: 25px;
    transform: skew(-10deg) rotate(-10deg);
    padding: 3px;
    background: white;
    border: 1px solid #ccc;
`;

const StyledBarInner = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background: orange;
    transition: width 1s ease-out;
`;

const StyledLevel = styled.div`
    width: 100%;
    transform: rotate(-10deg);
    text-align: right;

    span {
        font-family: ${({theme}) => theme.typography.font.headline};
        vertical-align: super;
    }

    b {
        font-size: 50px;
        color: orange;
        -webkit-text-stroke: 1px white;
    }
`;

function Profile(props) {
    const {name, image, experience} = props;
    const {level, percentage} = getLevel(experience, 1);

    return (
        <StyledProfile>
            <StyledImage src={image}/>
            <StyledBar>
                <StyledBarOuter>
                    <StyledBarInner percentage={percentage} />
                </StyledBarOuter>
                <StyledLevel>
                    <span>Lv</span><b>{level}</b>
                </StyledLevel>
            </StyledBar>
            <h2>{name}</h2>
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