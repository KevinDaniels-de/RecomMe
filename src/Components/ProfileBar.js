import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import iconClose from '../assets/icon-close.svg'
import iconRecommendation from '../assets/recommendation.svg'
import iconPeople from '../assets/people.svg'

const StyledProfileImage = styled.div`
    max-width: ${({size}) => size}px;
    width: 100%;
    position: relative;
    height: ${({size}) => size}px;
    padding: 3px;
    background: ${({theme}) => theme.colors.purple};
    border-radius: 100%;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light};
    z-index: 1;
`;

const StyledImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 100%;
`;

const ProfileImage = ({image, size}) => {
    return (
        <StyledProfileImage size={size} className="profile-image">
            <StyledImage src={image} alt="Profile" />
        </StyledProfileImage>
    );
};

const StyledProfileExperience = styled.div`
    width: 100%;
    position: relative;
    flex: 1;
    margin-top: auto;
    z-index: 0;
`;

const StyledExperienceOuter = styled.div`
    width: 100%;
    height: ${({size}) => size}px;
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

const ProfileExperience = ({experience, size}) => {
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
            <StyledExperienceOuter size={size}>
                <StyledExperienceInner percentage={percentage} />
            </StyledExperienceOuter>
            <StyledLevel>
                <span>Lv</span>{level}
            </StyledLevel>
        </StyledProfileExperience>
    );
};

const StyledProfile = styled.div`
    ${({isBackground}) => isBackground === true ? `
        position: fixed;
        bottom: 90px;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, 205%);
        transition: transform .6s;
    ` : `
        position: relative;
    `};
    
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${({isBackground}) => isBackground === true ? "#fff" : ''};
    padding: ${({isBackground}) => isBackground === true ? "20px" : ''};
    text-align: center;

    &.active {
        transform: translate(-50%, 0%);
    }
`;

const StyledLogout = styled.div`
    position: relative;
    text-align: center;
    margin-left: 30px;
    cursor: pointer;

    img {
        background: ${({theme}) => theme.colors.purple};
        border-radius: 100%;
        box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark};
        width: 30px;
    }

    p {
        line-height: 80%;
        text-transform: uppercase;
        font-size: 1.2rem;
    }
`;

const StyledStatistic = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 20px;
`;

const StyledStatisticItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:first-child {
        padding-right: 15px;
    }

    img {
        background: ${({theme}) => theme.colors.purple};
        width: 30px;
        height: 30px;
        border-radius: 100%;
        padding: 7px;
        margin-right: 10px;
    }

    b {
        font-size: 1.1rem;
    }
`;

const ProfileBar = ({userData, sizeImg, sizeExp, isBackground, isActive, signOut}) => {
    return (
        <StyledProfile isBackground={isBackground} className={isActive ? "active" : ""}>
            <ProfileImage image={userData.image} size={sizeImg} />
            <ProfileExperience size={sizeExp} experience={userData.experience} />
            {isBackground 
            ? <StyledLogout onClick={signOut}>
                <img src={iconClose} alt="Logout" />
                <p>Sign out</p>
            </StyledLogout>
            : ''}
            <StyledStatistic>
                <StyledStatisticItem>
                    <img src={iconRecommendation} alt="Recommendation" />
                    <b>{userData.recommendations} {userData.recommendations === 1 ? "Recommendation" : "Recommendations"}</b>
                </StyledStatisticItem>
                <StyledStatisticItem>
                    <img src={iconPeople} alt="People" />
                    <b>{userData.peopleMet} People met</b>
                </StyledStatisticItem>
            </StyledStatistic>
        </StyledProfile>
    );
};

export default ProfileBar;