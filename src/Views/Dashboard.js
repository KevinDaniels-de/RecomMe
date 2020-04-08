import React from 'react'
import styled from 'styled-components'

import Status from '../Components/Status'

const StyledDashboard = styled.section`
    padding: 20px;
`;

function Dashboard(props) {
    const {userData} = props;

    return (
        <StyledDashboard>
            <Status userData={userData}/>
        </StyledDashboard>
    )
}

export default Dashboard;