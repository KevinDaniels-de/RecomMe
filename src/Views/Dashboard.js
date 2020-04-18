import React from 'react'
import styled from 'styled-components'

import Container from '../Components/Container'
import Status from '../Components/Status'
import Activity from '../Components/Activity'

const StyledDashboard = styled.section`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;

    .profile {
        margin: 0;
        border-radius: 0;
        background: linear-gradient(145deg, ${({theme}) => theme.colors.blue}, ${({theme}) => theme.colors.royal});
        box-shadow: none;
        padding-bottom: 20px;
        height: 180px;
    }

    .main {
        margin: 0;
        padding: 20px;
        transform: translateY(-20px);
        border-radius: 20px 20px 0 0;
        background: ${({theme}) => theme.colors.white};
        box-shadow:  5px 5px 19px ${({theme}) => theme.colors.shades.dark}, 
                    -5px -5px 19px ${({theme}) => theme.colors.shades.light};
    }

    ${({theme}) => theme.mediaQueries.desktop} {}
`;

function Dashboard(props) {
    const {userData} = props;
    const {name, image, experience, recommendations, peopleMet} = userData;

    return (
        <StyledDashboard>
            <Container className="profile" size={100}>
                <Status name={name} image={image} experience={experience} recommendations={recommendations} peopleMet={peopleMet} />
            </Container>

            <Container className="main" size={100}>
                <h1></h1>
            </Container>
        </StyledDashboard>
    )
}

export default Dashboard;