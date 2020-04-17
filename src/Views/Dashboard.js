import React from 'react'
import styled from 'styled-components'

import Container from '../Components/Container'
import Status from '../Components/Status'
import Activity from '../Components/Activity'

const StyledDashboard = styled.section`
    position: relative;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;

    ${({theme}) => theme.mediaQueries.desktop} {
        .profile {
            max-width: 400px;
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .extra {
            max-width: 80px;
            max-height: 80px;
            position: absolute;
            right: 440px;
            top: 20px;

            &:last-child {
                right: 440px;
                top: 120px;
            }
        }
    }
`;

function Dashboard(props) {
    const {userData} = props;
    const {name, image, experience, recommendations, peopleMet} = userData;

    return (
        <StyledDashboard>
            <Container className="profile" size={100}>
                <Status name={name} image={image} experience={experience}/>
            </Container>

            <Container className="extra" size={47}>
                <Activity recommendations={recommendations}/>
            </Container>

            <Container className="extra" size={47}>
                <Activity peopleMet={peopleMet}/>
            </Container>
        </StyledDashboard>
    )
}

export default Dashboard;