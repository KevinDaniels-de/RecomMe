import React from 'react'
import styled from 'styled-components'

import ProfileImage from '../Components/ProfileImage'
import ProfileExperience from '../Components/ProfileExperience'

const StyledDashboard = styled.section`
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 20px;
`;

const StyledContent = styled.div`
    position: relative;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${({theme}) => theme.colors.white};
    border-radius: 20px;
    padding: 20px;
    box-shadow: 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, -5px -5px 10px ${({theme}) => theme.colors.shades.light};
    text-align: center;

    h5 {
        font-size: 3rem;
        font-family: ${({theme}) => theme.typography.font.text};
        width: 100%;
    }

    h6 {
        color: rgba(0,0,0,.3);
        font-size: 1.4rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        width: 100%;
    }

    .profile-experience {
        transform: translate(-15px, 5px);
    }
`;

const StyledEvents = styled.div`
    h4 {
        text-align: center;
        margin: 30px 0 30px 0;
        color: ${({theme}) => theme.colors.white};
        text-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light};
    }

    div {
        color: ${({theme}) => theme.colors.white};
        padding: 20px 40px;
        border-radius: 20px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, inset -5px -5px 10px ${({theme}) => theme.colors.shades.light};

        b {
            color: ${({theme}) => theme.colors.shades.light};
            text-transform: uppercase;
            font-size: 1rem;
            letter-spacing: 4px;
            line-height: 100%;
        }
    }
`;

const Dashboard = ({userData, multiplicator}) => {
    const {name, image, experience, recommendations, peopleMet} = userData;

    return (
        <StyledDashboard>
            <StyledContent>
                <h5>Hey, {name}</h5>
                <h6>Your Status</h6>
                <ProfileImage image={image} size={90} />
                <ProfileExperience experience={experience} />
            </StyledContent>
            <StyledEvents>
                <h4>Daily Events</h4>

                <div>
                    <b>Current Event</b>
                    <span>Double Experience!</span>
                </div>

                <div>
                    <b>Next Event</b>
                    <span>Increased User Range!</span>
                </div>
            </StyledEvents>
        </StyledDashboard>
    )
}

export default Dashboard;