import React from 'react'
import styled from 'styled-components'

const StyledProfileExperience = styled.div`
    width: 100%;
    position: relative;
    flex: 1;
    margin-top: auto;
    z-index: 0;
`;

const StyledExperienceOuter = styled.div`
    width: 100%;
    height: 30px;
    background: red;
    position: relative;
    padding: 5px;
    border-radius: 50px;
    background: ${({theme}) => theme.colors.white};
    background: linear-gradient(145deg, rgba(0,0,0,.1), rgba(255,255,255,.1));
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light};
`;

const StyledExperienceInner = styled.div`
    width: ${({percentage}) => percentage}%;
    height: 100%;
    border-radius: 50px;
    position: relative;
    background: ${({theme}) => theme.colors.purple};
    box-shadow: inset 3px 3px 5px ${({theme}) => theme.colors.shades.light}, inset -3px -3px 5px ${({theme}) => theme.colors.shades.dark};
`;

const StyledLevel = styled.h5`
    margin: 0;
    text-align: right;
    text-transform: uppercase;

    span {
        font-size: 50%;
    }
`;

const ProfileExperience = ({experience}) => {
    const getLevel = exp => {
        let levelFormula = 1 * .75 * Math.sqrt(exp);
    
        return {
            level: Math.floor(levelFormula),
            percentage: Math.floor((levelFormula - Math.floor(levelFormula)) * 100)
        };
    }

    const {level, percentage} = getLevel(experience);

    return (
        <StyledProfileExperience className="profile-experience">
            <StyledExperienceOuter>
                <StyledExperienceInner percentage={percentage} />
            </StyledExperienceOuter>
            <StyledLevel>
                <span>Lv</span>{level}
            </StyledLevel>
        </StyledProfileExperience>
    );
};

export default ProfileExperience;