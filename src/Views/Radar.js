import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import Level from '../Components/Level'

function Radar({rangeUsers, user, multiplicator, changeExperience}) {

    const StyledRadarContainer = styled.div``;

    const StyledLevel = styled.div`
        max-width: 120px;
        width: 100%;
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 10;
        color: ${({theme}) => theme.colors.white};
    `;

    const StyledRadarContent = styled.div`
        position: absolute;
        width: 100%;
        height: calc(100% - 85px);
        background: ${({theme}) => theme.colors.royal};
        z-index: 0;
    `;

    const StyledUser = styled.img`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110px;
        height: 110px;
        border-radius: 100%;
        box-shadow: 3px 3px 10px ${({theme}) => theme.colors.shades.black};
        z-index: 9;
    `;

    const StyledOtherUser = styled.img`
        position: absolute;
        top: ${props => props.top}px;
        left: ${props => props.left}px;
        transition: all .3s;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border-radius: 100%;
        box-shadow: 3px 3px 10px ${({theme}) => theme.colors.shades.black};
        z-index: 7;
    `;

    const [isPositionSet, setPositionSet] = useState(false);
    const [radarUsers, setRadarUsers] = useState(rangeUsers);
    const [exp, setExp] = useState(user.experience);

    const generateRandomCoordinates = () => {
        let leftInt = Math.floor(Math.random() * ((window.innerWidth - 20) - 20) + 20);
        let topInt = Math.floor(Math.random() * ((window.innerHeight - 105) - 20) + 20);

        return {y: topInt, x: leftInt};
    };

    useEffect(() => {
        if(!isPositionSet) {
            let newRadarUsers = radarUsers.filter(user => user.show).slice(0, 5).map(user => {
                let newCoords = generateRandomCoordinates();
                user.x = newCoords.x;
                user.y = newCoords.y;
            });

            setPositionSet(true);
            setRadarUsers(newRadarUsers);
        }
    }, [radarUsers]);

    const handleClick = (i, e) => {
        e.preventDefault();

        let userCoords = {
            top: document.querySelector('.own-user').offsetTop,
            left: document.querySelector('.own-user').offsetLeft
        };

        e.target.style.top = userCoords.top+"px";
        e.target.style.left = userCoords.left+"px";

        setTimeout(() => {
            rangeUsers[i].show = false;

            rangeUsers[i].y = userCoords.top;
            rangeUsers[i].x = userCoords.left;

            setExp(exp + 5);
            changeExperience(exp + 5);
        }, 300);
    };

    useEffect(() => {
        setExp(user.experience);
    }, [user]);

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

    console.log(rangeUsers);
    

    return (
        <StyledRadarContainer>
            <StyledLevel>
                <Level experience={exp} multiplicator={multiplicator} />
            </StyledLevel>
            <StyledRadarContent>
                {rangeUsers.map((range, i) => range.show 
                    ? <StyledOtherUser onClick={e => handleClick(i, e)} key={i} src={range.image} top={range.y} left={range.x} title={`Distance: ${getDistance(user.lat, user.long, range.lat, range.long)}m`} />
                    : ''
                )}
                <StyledUser className="own-user" src={user.image} alt="User" />
            </StyledRadarContent>
        </StyledRadarContainer>
    )
}

export default Radar;