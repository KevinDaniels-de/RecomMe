import React, {useState} from 'react'
import styled from 'styled-components'
import userAvatar from "../assets/userAvatar.jpg";

import Level from '../Components/Level'

function Radar({user}) {

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

    const otherUsers = [
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        },
        {
            image: userAvatar,
        }
    ];

    const getRandomCoordinate = () => {
        let leftInt = Math.floor(Math.random() * ((window.innerWidth - 20) - 20) + 20);
        let topInt = Math.floor(Math.random() * ((window.innerHeight - 105) - 20) + 20);

        return {top:topInt, left:leftInt};
    };

    const [exp, setExp] = useState(user.experience);

    const handleClick = (e) => {
        e.preventDefault();

        let userCoords = {
            top: document.querySelector('.own-user').offsetTop,
            left: document.querySelector('.own-user').offsetLeft
        };

        e.target.style.top = userCoords.top+"px";
        e.target.style.left = userCoords.left+"px";

        setTimeout(() => {
            let currentExp = exp;
            setExp(currentExp += 10);
        }, 300);
    };

    return (
        <StyledRadarContainer>
            <StyledLevel>
                <Level experience={exp} />
            </StyledLevel>
            <StyledRadarContent>
                {otherUsers.map((item, i) =>
                    <StyledOtherUser onClick={handleClick} key={i} src={item.image} top={getRandomCoordinate().top} left={getRandomCoordinate().left} />
                )}
                <StyledUser className="own-user" src={user.image} alt="User" />
            </StyledRadarContent>
        </StyledRadarContainer>
    )
}

export default Radar;