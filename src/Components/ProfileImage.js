import React from 'react'
import styled from 'styled-components'

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

export default ProfileImage;