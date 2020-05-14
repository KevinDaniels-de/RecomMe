import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledBrowse = styled.section`
    position: relative;
    margin: 0 auto;
    width: 90%;
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 20px;
    background: rgba(0,0,0,.15);
    border-radius: 10px;
    box-shadow: inset 5px 5px 10px ${({theme}) => theme.colors.shades.dark}, inset -5px -5px 10px ${({theme}) => theme.colors.shades.light};
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
`;

const StyledStore = styled.div`
    background: ${({theme}) => theme.colors.white};
    border-radius: 10px;
    max-width: 130px;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.light}, -3px -3px 5px ${({theme}) => theme.colors.shades.dark};

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 15px;
        text-decoration: none;
    }
`;

const StyledLogo = styled.img`
    width: 100%;
    height: 70px;
    object-fit: contain;
    object-position: 50% 50%;
`;

const StyledHeadline = styled.h6`
    margin: 0;
    color: ${({theme}) => theme.colors.black};
    padding-top: 15px;
    font-size: 1.6rem;
`;

const Browse = ({stores}) => {
    return (
        <StyledBrowse>
             {stores.map(item => 
                    <StyledStore key={item.id} size={47} className="store-item">
                        <Link to={`/browse/${item.title.toLowerCase().trim().replace(/ /g, "-")}`}>
                            <StyledLogo src={item.logo} />
                            <StyledHeadline>{item.title}</StyledHeadline>
                        </Link>
                    </StyledStore>
                )}
        </StyledBrowse>
    )
}

export default Browse;