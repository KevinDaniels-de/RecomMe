import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import Container from '../Components/Container'

const StyledBrowse = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;

    .store-item {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        a {
            padding: 10px;
            color: ${({theme}) => theme.colors.black};
            text-decoration: none;
        }
    }
`;

const StyledLogo = styled.img`
    margin: 0 auto;
    width: 80%;
    height: 60px;
    object-fit: contain;
    object-position: 50% 50%;
    display: block;
    margin-bottom: 20px;
`;

const StyledHeadline = styled.h6`
    text-align: center;
    margin: 0;
    font-family: ${({theme}) => theme.typography.font.text};
    font-size: 1.3rem;
    font-weight: 700;
`;

function Browse(props) {
    const {storeData} = props;

    return (
        <StyledBrowse>
            <h1>Browser</h1>

            {storeData.map(item => 
                <Container key={item.id} size={47} className="store-item">
                    <Link to={`/browse/${item.title.toLowerCase().trim().replace(/ /g, "-")}`}>
                        <StyledLogo src={item.logo} />
                        <StyledHeadline>{item.title}</StyledHeadline>
                    </Link>
                </Container>
            )}
        </StyledBrowse>
    )
}

export default Browse;