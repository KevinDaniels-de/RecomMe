import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import userAvatar from "../assets/userAvatar.jpg";

import Level from '../Components/Level'

function Radar({user, multiplicator, changeExperience}) {

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

    const [exp, setExp] = useState(user.experience);
    const [otherUsers, setOtherUsers] = useState([
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        },
        {
            image: userAvatar,
            show: true
        }
    ]);

    const generateRandomCoordinates = (counter) => {
        let coordArray = [];

        for (let i = 0; i < counter; i++) {
            let leftInt = Math.floor(Math.random() * ((window.innerWidth - 20) - 20) + 20);
            let topInt = Math.floor(Math.random() * ((window.innerHeight - 105) - 20) + 20);
    
            coordArray.push({top: topInt, left: leftInt});
        }

        return coordArray;
    };

    const [coords, setCoords] = useState(generateRandomCoordinates(otherUsers.length));

    const handleClick = (i, e) => {
        e.preventDefault();

        let userCoords = {
            top: document.querySelector('.own-user').offsetTop,
            left: document.querySelector('.own-user').offsetLeft
        };

        e.target.style.top = userCoords.top+"px";
        e.target.style.left = userCoords.left+"px";

        setTimeout(() => {
            otherUsers[i].show = false;

            let newCoords = coords;
            newCoords[i].top = userCoords.top;
            newCoords[i].left = userCoords.left;

            setCoords(newCoords);
            setExp(exp + 5);
            changeExperience(exp + 5);
        }, 300);
    };

    useEffect(() => {
        setExp(user.experience);
    }, [user]);

    return (
        <StyledRadarContainer>
            <StyledLevel>
                <Level experience={exp} multiplicator={multiplicator} />
            </StyledLevel>
            <StyledRadarContent>
                {otherUsers.map((item, i) => item.show 
                    ? <StyledOtherUser onClick={e => handleClick(i, e)} key={i} src={item.image} top={coords[i].top} left={coords[i].left} />
                    : ''
                )}
                <StyledUser className="own-user" src={user.image} alt="User" />
            </StyledRadarContent>
        </StyledRadarContainer>
    )
}

export default Radar;