import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const StyledRadar = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 540px;
    width: 90%;
    height: calc(100vh - 160px);
    overflow: hidden;
    padding: 20px;
    background: rgba(0,0,0,.15);
    border-radius: 10px;
    box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, inset -5px -5px 10px ${({theme}) => theme.colors.shades.light};
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
`;

const StyledUser = styled.div`
    width: 75px;
    height: 75px;
    padding: 8px;
    background: ${({theme}) => theme.colors.shades.dark};
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    right: ${({right}) => right}%;
    bottom: ${({bottom}) => bottom}%;
    transition: right .3s, bottom .3s;
    box-shadow: inset 3px 3px 7px ${({theme}) => theme.colors.shades.dark}, inset -3px -3px 7px ${({theme}) => theme.colors.shades.light};

    &::after {
        content: "";
        position: absolute;
        top: -25%;
        left: 0;
        width: 100%;
        height: 130%;
        z-index: 10;
    }
`;

const StyledUserImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 100%;
`;

const StyledDistance = styled.div`
    color: ${({theme}) => theme.colors.white};
    background: rgba(0,0,0,.8);
    font-size: 1rem;
    display: inline-block;
    padding: 0px 10px;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 1;

    &::after {
        content: "";
        border-style: solid;
        border-width: 6px 6px 0 6px;
        border-color: rgba(0,0,0,.8) transparent transparent transparent;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 99%);
    }
`;

const StyledEmpty = styled.h4`
    color: ${({theme}) => theme.colors.white};
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
`;

const StyledText = styled.p`
    color: ${({theme}) => theme.colors.white};
    font-style: oblique;
    font-size: 1.6rem;
`;

const Radar = ({rangeUsers, user, multiplicator, updateUser}) => {    
    const [isPositionSet, setPositionSet] = useState(false);    

    const generateRandomCoordinates = () => {
        // let rightInt = Math.floor(Math.random() * ((window.innerWidth - 20) - 20) + 20);
        // let bottomInt = Math.floor(Math.random() * ((window.innerHeight - 105) - 20) + 20);
        // let rightInt = Math.floor(Math.random() * (max - min + 1) + min);
        let rightInt = Math.floor(Math.random() * (85 - 5 + 1) + 5);
        let bottomInt = Math.floor(Math.random() * (63 - 5 + 1) + 5);

        return {y: bottomInt, x: rightInt};
    };

    useEffect(() => {      
        if(rangeUsers.length > 0)  
            if(!isPositionSet) {                
                let newRadarUsers = rangeUsers.filter(radarUser => radarUser.show).slice(0, 5).map(user => {
                    let newCoords = generateRandomCoordinates();
                    user.x = newCoords.x;
                    user.y = newCoords.y;
                });

                rangeUsers = newRadarUsers;

                setPositionSet(true);
            }
    }, [rangeUsers]);

    const handleClick = (i, e) => {
        e.preventDefault();

        e.target.style.right = "26%";
        e.target.style.bottom = "-16%"

        setTimeout(() => {
            rangeUsers[i].show = false;

            rangeUsers[i].y = -30;
            rangeUsers[i].x = -30;

            let newUser = user;
            newUser.experience += 20;
            newUser.peopleMet += 1;

            updateUser(newUser);
        }, 250);
    };

    const getDistance = (latA, longA, latB, longB) => {
        let R = 6371000; // km
        let dLat = (latB-latA) * Math.PI / 180;
        let dLon = (longB-longA) * Math.PI / 180;
        let lat1 = (latA) * Math.PI / 180;
        let lat2 = (latB) * Math.PI / 180;

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c;

        return Math.floor(d);
    }

    return (
        <StyledRadar>
            <StyledText>
                Find users that recommended something in your area.<br />Collect them to gain more experience!
            </StyledText>

            {rangeUsers.filter(user => user.show).length > 0
                ? rangeUsers.map((range, i) => range.show 
                    ? <StyledUser onClick={e => handleClick(i, e)} key={i} bottom={range.y} right={range.x}>
                        <StyledDistance>{`${getDistance(user.lat, user.long, range.lat, range.long)}m`}</StyledDistance>
                        <StyledUserImage src={range.image} alt="Profile Image" />
                    </StyledUser>
                    : ''
                )
                : <StyledEmpty>No users in range found</StyledEmpty>
            }
        </StyledRadar>
    )
}

export default Radar;