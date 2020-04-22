import React from 'react'
import styled from 'styled-components'

const StyledLevelContainer = styled.div``;

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

const getLevel = (exp, bonus) => {
    let levelFormula = bonus * .75 * Math.sqrt(exp);

    return {
        level: Math.floor(levelFormula),
        percentage: Math.floor((levelFormula - Math.floor(levelFormula)) * 100)
    };
}

function Level(props) {
    const {experience} = props;
    const {level, percentage} = getLevel(experience, 1);

    return (
        <StyledLevelContainer>
            <StyledBarOuter>
                <StyledBarInner percentage={percentage} />
            </StyledBarOuter>
            <StyledLevel>
                <span>Lv</span><b>{level}</b>
            </StyledLevel>
        </StyledLevelContainer>
    )
}

export default Level;