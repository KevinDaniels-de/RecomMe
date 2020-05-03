import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import Container from '../Components/Container'

const StyledBrowse = styled.section`
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

const StyledBrowseTitle = styled.div`
    background: linear-gradient(145deg, ${({theme}) => theme.colors.blue}, ${({theme}) => theme.colors.royal});
    color: ${({theme}) => theme.colors.white};
    padding: 20px;
`;

const StyledHeadline = styled.h6`
    text-align: center;
    margin: 0;
    font-family: ${({theme}) => theme.typography.font.text};
    font-size: 1.3rem;
    font-weight: 700;
`;

const StyledContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    background: ${({theme}) => theme.colors.white};
    border-radius: 20px 20px 0 0;
    position: relative;
    margin-top: -20px;

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

function Browse({stores}) {

    return (
        <StyledBrowse>
            
            <StyledBrowseTitle>
                <h3>Browse Stores</h3>
            </StyledBrowseTitle>

            <StyledContent>
                {stores.map(item => 
                    <Container key={item.id} size={47} className="store-item">
                        <Link to={`/browse/${item.title.toLowerCase().trim().replace(/ /g, "-")}`}>
                            <StyledLogo src={item.logo} />
                            <StyledHeadline>{item.title}</StyledHeadline>
                        </Link>
                    </Container>
                )}
            </StyledContent>
        </StyledBrowse>
    )
}

export default Browse;